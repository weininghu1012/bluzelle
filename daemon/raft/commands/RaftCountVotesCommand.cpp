#include "RaftCountVotesCommand.h"

#include <typeinfo>
#include <cassert>

RaftCountVotesCommand::RaftCountVotesCommand(RaftState& s, bool yes)
        : state_(s), voted_yes_(yes)
{
    assert( string(typeid(state_).name()).find("RaftState") == string::npos );
}

boost::property_tree::ptree RaftCountVotesCommand::operator()()
{
    boost::property_tree::ptree result;
    auto* s = dynamic_cast<RaftCandidateState*>(&state_);
    if (s != nullptr)
        {
        s->count_vote(voted_yes_);
        result.put("raft", "vote-count");
        result.put("data.yes", s->yes_votes());
        result.put("data.no", s->no_votes());
        pt_to_cout(result);
        }
    return result;
}