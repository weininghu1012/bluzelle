#ifndef BLUZELLE_NODEINFO_H
#define BLUZELLE_NODEINFO_H

#include <string>
#include <map>
#include <vector>
#include <boost/lexical_cast.hpp>
#include <iostream>

using std::string;
using std::vector;
using std::map;
using boost::lexical_cast;

class NodeInfo {
    map<string, string> values_;
    NodeInfo(NodeInfo const &) = default;
    NodeInfo() = default;

public:
    static NodeInfo &get_instance()
    {
        static NodeInfo instance_;
        return instance_;
    }

    template <typename T>
    const T
    get_value(const string &key)
    {
        try {
            return lexical_cast<T>(values_[key]);
            }
        catch(const std::exception& e)
            {
            std::cerr << e.what() << std::endl;
            }
        return T{0};
    }

    template <typename T>
    void set_value(const string &key, const T &value)
    {
        values_[key] = boost::lexical_cast<std::string>(value);
    }
};

#endif //BLUZELLE_NODEINFO_H
