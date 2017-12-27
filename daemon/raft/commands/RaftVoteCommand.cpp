#include "RaftVoteCommand.h"
#include "JsonTools.h"

static constexpr char s_vote_yes_message[] = "({\"raft\":\"vote\", \"data\":{\"voted\":\"yes\"}})";
static constexpr char s_vote_no_message[] = "({\"raft\":\"vote\", \"data\":{\"voted\":\"no\"}})";

RaftVoteCommand::RaftVoteCommand(RaftCandidateState& s) : state_(s)
{

}

boost::property_tree::ptree RaftVoteCommand::operator()()
{
    boost::property_tree::ptree result;

    if (state_.nominated_self())
        result = pt_from_json_string(s_vote_no_message);
    else
        result = pt_from_json_string(s_vote_yes_message);

    return result;
}