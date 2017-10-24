#ifndef KEPLER_SERVICES_H
#define KEPLER_SERVICES_H

#include "services/Service.h"

#include <string>
#include <map>

class Services
{
    // TODO:  make Service* a unique or shared ptr...
    std::map<std::string, Service*> _services;
public:
    void add_service(std::string service_name, Service* service)
    {
        _services[service_name] = service;
    }

    std::string operator()(const std::string &service_name, const std::string& json_string)
    {
        Service* service = _services[service_name];
        return (*service)(json_string);
    }

    ~Services()
    {
        // clean up the map...
    }

};

#endif //KEPLER_SERVICES_H
