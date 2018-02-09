#ifndef BLUZELLE_CONFIGPARSER_H
#define BLUZELLE_CONFIGPARSER_H

#include <sstream>
#include <boost/property_tree/ptree.hpp>

using namespace std;
namespace bpt = boost::property_tree;

class ConfigParser
{
    stringstream& config_stream_;
public:

    ConfigParser() = delete;

    ConfigParser(stringstream& instream);

    bpt::ptree operator()();
};

#endif //BLUZELLE_CONFIGPARSER_H
