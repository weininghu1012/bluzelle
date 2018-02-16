#include "URL.h"

#include <iostream>
#include <utility>
#include <vector>
#include <boost/regex.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/algorithm/string_regex.hpp>

std::pair<std::string, std::string>
URL::scheme_and_remainder(const std::string &url)
{
    std::vector<std::string> results;
    boost::algorithm::split_regex(results, url, boost::regex("://"));
    return std::pair<std::string, std::string>(
        results.size()==2 ? results[0] : "http",
        results[results.size()==2 ? 1 : 0]);
};

std::pair<std::string, std::string>
URL::host_port_and_remainder(const std::string &partial)
{
    std::vector<std::string> results;
    boost::split(results, partial, boost::is_any_of("/"));
    return std::pair<std::string, std::string>(
        results[0],
        partial.substr(results[0].size())
    );
};

std::pair<std::string, uint16_t>
URL::host_and_port_parse(const std::string& host_port)
{
    std::vector<std::string> results;
    boost::split(results, host_port, boost::is_any_of(":"));
    return std::pair<std::string, uint16_t>(
        results[0], (results.size()==2 ?
        boost::lexical_cast<uint16_t>(results[1]) :
        80)
    );
};

URL::URL(const std::string& url)
{
    std::string remainder;
    auto pair = scheme_and_remainder(url);
    this->scheme = pair.first;
    pair = host_port_and_remainder(pair.second);
    auto str_int =  host_and_port_parse(pair.first);
    this->host = str_int.first;
    this->port = str_int.second;
    this->target = pair.second;
}

std::string URL::get_scheme() const
{
    return this->scheme;
}

std::string URL::get_host() const
{
    return this->host;
}

uint16_t URL::get_port() const
{
    return this->port;
}

std::string
URL::get_target() const
{
    return this->target;
}

std::string
URL::operator()() const
{
    std::stringstream ss;
    ss << this->scheme
       << "://"
       << this->host
       << ":"
       << this->port
       << this->target;
    return ss.str();
}
