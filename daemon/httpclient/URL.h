#ifndef BLUZELLE_URL_H
#define BLUZELLE_URL_H

#include <string>

class URL
{
    // ex: https://www.something.com/path/to/thing.txt?param1=yes&param2=no
    std::string scheme; // https
    std::string host; // www.something.com
    uint16_t    port;
    std::string target; // boost beast cares about scheme, host, port and target.

    std::pair<std::string, std::string>
    scheme_and_remainder(const std::string &url);

    std::pair<std::string, std::string>
    host_port_and_remainder(const std::string &partial);

    std::pair<std::string, uint16_t>
    host_and_port_parse(const std::string& host_port);

public:
    URL() = delete;

    explicit
    URL(const std::string& url);

    std::string
    operator()() const;

    std::string
    get_scheme() const;

    std::string
    get_host() const;

    uint16_t
    get_port() const;

    std::string
    get_target() const;
};


#endif //BLUZELLE_URL_H
