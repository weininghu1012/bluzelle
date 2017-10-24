#ifndef KEPLER_GETALLNODES_H
#define KEPLER_GETALLNODES_H

#include "services/Service.h"
#include "Node.h"

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

namespace pt = boost::property_tree;

class GetAllNodes : public Service {
    Nodes* _nodes;

    pt::ptree parse_input(const std::string& json_str)
    {
        std::stringstream ss;
        ss << json_str;
        pt::ptree in_tree;
        pt::read_json(ss, in_tree);
        return in_tree;
    }

    pt::ptree nodes_to_tree(long seq = 0)
    {
        pt::ptree out_tree;
        out_tree.put("cmd","updateNodes");

        pt::ptree array;
        for(auto node : *_nodes)
            {
            pt::ptree child1;
            child1.put("address", node->get_thread_id());
            child1.put("nodeState", node->state());
            child1.put<long>("messages", node->state());
            array.push_back(std::make_pair("", child1));
            }
        out_tree.add_child("data", array);
        out_tree.put("seq", seq);// in_tree.get<long>("seq"));
        return out_tree;
    }

    std::string tree_to_response(const pt::ptree& out_tree)
    {
        std::stringstream ss;
        ss.str("");
        pt::write_json(ss,out_tree);
        return ss.str();
    }

public:
    GetAllNodes(Nodes* nodes) : _nodes(nodes)
    {
    }

    std::string operator()(const std::string& request) override
    {
        pt::ptree out_tree;
        pt::ptree in_tree;

        in_tree = parse_input(request);
        out_tree = nodes_to_tree(in_tree.get<long>("seq"));

        return tree_to_response(out_tree);
    }

    void set_nodes(Nodes* nodes) {_nodes = nodes;}
};

#endif //KEPLER_GETALLNODES_H
