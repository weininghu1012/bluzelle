#ifndef KEPLER_REMOVENODES_H
#define KEPLER_REMOVENODES_H

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

#include "services/Service.h"

class RemoveNodes : public Service {
protected:
    Nodes*                      nodes_; // Removed nodes.
    system_clock::time_point    last_update_;

public:
    RemoveNodes(Nodes* nodes) : nodes_(nodes)
    {

    }

    pt::ptree nodes_to_tree(long seq = 0)
    {
        pt::ptree out_tree;
        out_tree.put("cmd","removeNodes");

        pt::ptree array;
        for(auto node : *nodes_)
        {
            if (node->last_change() > last_update_)
            {
                pt::ptree child1;
                child1.put("address", node->name());
                array.push_back(std::make_pair("", child1));
            }
        }
        out_tree.add_child("data", array);
        out_tree.put("seq", seq);

        last_update_ = system_clock::now();

        // Purge removed nodes.
        for (auto n : *nodes_) {
            delete n;
        }
        nodes_->clear();

        return out_tree;
    }

    std::string tree_to_response(const pt::ptree& out_tree)
    {
        std::stringstream ss;
        ss.str("");
        auto d = out_tree.get_child("data.");
        if (d.size() != 0) {
            pt::write_json(ss,out_tree);
        }

        return ss.str();
    }

    std::string operator()(const std::string& request) override
    {
        pt::ptree out_tree;
        pt::ptree in_tree;

        in_tree = parse_input(request);
        out_tree = nodes_to_tree(in_tree.get<long>("seq"));

        return tree_to_response(out_tree);
    }
};

#endif //KEPLER_REMOVENODES_H
