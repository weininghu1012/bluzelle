#ifndef KEPLER_GETALLNODES_H
#define KEPLER_GETALLNODES_H

#include "services/Service.h"
#include "Node.h"

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

namespace pt = boost::property_tree;

class GetAllNodes : public Service {
    Nodes& _nodes;

public:
    GetAllNodes(Nodes& nodes) : _nodes(nodes)
    {
    }

    std::string operator()(const std::string& json_string) override
    {
        // req {"cmd":"getAllNodes","seq":0}
        // res {"cmd":"updateNodes","data":[{"address":"0x00","nodeState":"alive","messages":20},{"address":"0x01","nodeState":"dead","messages":20}],"seq":4}

        // input
        std::stringstream ss;
        ss << json_string;
        pt::ptree in_tree;
        pt::read_json(ss, in_tree);

        // create the output
        pt::ptree out_tree;
        out_tree.put("cmd","updateNodes");

        pt::ptree array;
        for(auto node : _nodes)
            {
            pt::ptree child1;
            child1.put("address", node->get_thread_id());
            child1.put("nodeState", node->state());
            child1.put("messages", node->state());
            array.push_back(std::make_pair("", child1));
            }
        out_tree.add_child("data", array);
        out_tree.put("seq", in_tree.get<long>("seq"));

        // output
        ss.str("");
        pt::write_json(ss,out_tree);
        return ss.str();
    }

    void set_nodes(Nodes& nodes) {_nodes = nodes;}
};

#endif //KEPLER_GETALLNODES_H
