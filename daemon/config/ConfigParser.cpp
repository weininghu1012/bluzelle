#include "ConfigParser.h"


#include <sstream>
#include <boost/property_tree/json_parser.hpp>

namespace bpt = boost::property_tree;

ConfigParser::ConfigParser(stringstream& instream) :
    config_stream_(instream) {}


bpt::ptree
ConfigParser::operator()()
{
    bpt::ptree tree;
    bpt::json_parser::read_json(config_stream_, tree);
    return tree;
};
