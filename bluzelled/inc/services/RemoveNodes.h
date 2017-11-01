#ifndef KEPLER_REMOVENODES_H
#define KEPLER_REMOVENODES_H

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

#include "services/GetAllNodes.h"

class RemoveNodes : public GetAllNodes {
protected:
    system_clock::time_point    last_remove_;

public:
    RemoveNodes(Nodes* nodes) : GetAllNodes(nodes)
    {

    }

    std::string operator()(const std::string& request) override
    {
        // produce JSON
        std::string response = GetAllNodes::operator()(request);

        last_remove_ = system_clock::now();

        return response;
    }
};

#endif //KEPLER_REMOVENODES_H
