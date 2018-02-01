#ifndef BLUZELLE_APIUPDATENODE_H
#define BLUZELLE_APIUPDATENODE_H

#include "Command.hpp"
#include "ApiCommandQueue.h"
#include "Storage.h"

class ApiUpdateNodeCommand : public Command
{
private:
public:
    ApiUpdateNodeCommand(
    );

    virtual
    boost::property_tree::ptree
    operator()();
};


#endif //BLUZELLE_APIUPDATENODE_H
