#ifndef BLUZELLE_RAFTCOUNTVOTESCOMMAND_H
#define BLUZELLE_RAFTCOUNTVOTESCOMMAND_H

#include "Command.hpp"
#include "RaftCandidateState.h"

class RaftCountVotesCommand : public Command
{
private:

    RaftState &state_;

    bool voted_yes_;

public:

    RaftCountVotesCommand
        (RaftState &s,
         bool yes);

    boost::property_tree::ptree
    operator()() override;
};

#endif //BLUZELLE_RAFTCOUNTVOTESCOMMAND_H
