#include "RaftCountVotesCommand.h"

RaftCountVotesCommand::RaftCountVotesCommand(RaftState& s, bool yes)
        : state_(dynamic_cast<RaftCandidateState&>(s)), voted_yes_(yes)
{

}

boost::property_tree::ptree RaftCountVotesCommand::operator()()
{
    boost::property_tree::ptree result;

    state_.count_vote(voted_yes_);

    return result;
}