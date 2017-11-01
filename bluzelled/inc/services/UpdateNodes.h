#ifndef KEPLER_UPDATENODES_H
#define KEPLER_UPDATENODES_H

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

#include "services/GetAllNodes.h"


class UpdateNodes : public GetAllNodes {
protected:
    system_clock::time_point    last_update_;

public:
    UpdateNodes(Nodes* nodes) : GetAllNodes(nodes)
    {

    }


    std::string operator()(const std::string& request) override
    {
        // Get subset of nodes we haven't updated yet.

        // reset nodes_

        // produce JSON
        std::string response = GetAllNodes::operator()(request);

        last_update_ = system_clock::now();

        return response;
    }
};

#endif //KEPLER_UPDATENODES_H
