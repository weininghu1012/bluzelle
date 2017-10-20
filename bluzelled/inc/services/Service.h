#ifndef KEPLER_SERVICE_H
#define KEPLER_SERVICE_H

#include <iostream>
#include <string>

class Service {
public:
    virtual std::string operator()(const std::string& json_string)
    {
        std::cout<< "Service base data:[" << json_string <<"]\n";
        return "Service::Base";
    }
};

#endif //KEPLER_SERVICE_H
