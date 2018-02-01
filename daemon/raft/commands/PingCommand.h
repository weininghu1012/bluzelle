#ifndef BLUZELLE_PINGCOMMAND_H
#define BLUZELLE_PINGCOMMAND_H

#include "Command.hpp"

namespace bpt = boost::property_tree;

class PingCommand : public Command
{
public:
    virtual
    bpt::ptree
    operator()()
    {
        bpt::ptree pt;
        pt.put("cmd", "pong");
        return pt;
    };


};


#endif //BLUZELLE_PINGCOMMAND_H
