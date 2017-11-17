#ifndef KEPLER_GETMINNODES_H
#define KEPLER_GETMINNODES_H

#include "services/Service.h"
#include "Node.h"

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

namespace pt = boost::property_tree;

unsigned long get_min_nodes();

class GetMinNodes : public Service {

    pt::ptree nodes_to_tree(long seq, unsigned long new_min_nodes)
    {
        pt::ptree out_tree;
        set_max_nodes(new_min_nodes);
        out_tree.put<long>("getMinNodes",new_min_nodes);
        out_tree.put<long>("seq", seq);
        return out_tree;
    }

    std::string tree_to_response(const pt::ptree& out_tree)
    {
        auto r = boost::format("{\"cmd\":\"setMinNodes\", \"data\": %d}")
                 % out_tree.get<long>("getMinNodes");

        return boost::str(r);
    }

public:

    std::string operator()(const std::string& request) override
    {
        pt::ptree out_tree;
        try
        {
            pt::ptree in_tree;
            in_tree = parse_input(request);
            out_tree = nodes_to_tree(in_tree.get<long>("seq"), get_min_nodes());
        }
        catch(std::exception& e)
        {
            out_tree.put("error", e.what());
            std::cerr << e.what();
        }
        return tree_to_response(out_tree);
    }
};


#endif //KEPLER_GETMINNODES_H
