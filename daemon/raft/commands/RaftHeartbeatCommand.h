#ifndef BLUZELLE_RAFTHEARTBEATCOMMAND_H
#define BLUZELLE_RAFTHEARTBEATCOMMAND_H

#include "Command.hpp"
#include "RaftState.h"

class RaftHeartbeatCommand : public Command
{
private:
    RaftState& state_;

public:
    RaftHeartbeatCommand(RaftState& s);

    boost::property_tree::ptree
    operator()() override ;
};

#endif //BLUZELLE_RAFTHEARTBEATCOMMAND_H
