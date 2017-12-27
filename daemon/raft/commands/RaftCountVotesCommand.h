#ifndef BLUZELLE_RAFTCOUNTVOTESCOMMAND_H
#define BLUZELLE_RAFTCOUNTVOTESCOMMAND_H

#include "Command.hpp"
#include "RaftCandidateState.h"

class RaftCountVotesCommand : public Command
{
private:
    RaftCandidateState& state_;
    bool voted_yes_;

public:
    RaftCountVotesCommand(RaftCandidateState& s, bool yes);
    virtual boost::property_tree::ptree operator()();
};

#endif //BLUZELLE_RAFTCOUNTVOTESCOMMAND_H
