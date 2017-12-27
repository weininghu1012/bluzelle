#include "RaftCountVotesCommand.h"

RaftCountVotesCommand::RaftCountVotesCommand(RaftCandidateState& s, bool yes) : state_(s), voted_yes_(yes)
{

}

boost::property_tree::ptree RaftCountVotesCommand::operator()()
{
    boost::property_tree::ptree result;

    state_.count_vote(voted_yes_);

    return result;
}