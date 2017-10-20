#ifndef KEPLER_PING_H
#define KEPLER_PING_H

#include "services/Service.h"
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <sstream>

namespace pt = boost::property_tree;

class Ping : public Service
{
public:
    std::string operator()(const std::string& json_string) override
    {
        std::stringstream ss;
        ss << json_string;
        pt::ptree tree;
        pt::read_json(ss, tree);
        tree.put("cmd", "pong");
        ss.str("");
        pt::write_json(ss,tree);
        return ss.str();
    }
};

#endif //KEPLER_PING_H
