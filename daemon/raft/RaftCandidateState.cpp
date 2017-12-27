#include <iostream>

#include "PeerList.h"
#include "CommandFactory.h"
#include "RaftCandidateState.h"
#include "JsonTools.h"

static constexpr char s_request_for_vote_message[] = "({\"raft\":\"request-vote\"})";


RaftCandidateState::RaftCandidateState(boost::asio::io_service& ios,
                                       Storage& s,
                                       CommandFactory& cf,
                                       ApiCommandQueue& pq,
                                       PeerList& ps)
        : RaftState(ios, s, cf, pq, ps),
          nominated_for_leader_(false),
          voted_yes_(0),
          voted_no_(0),
          election_timeout_timer_(ios_, boost::posix_time::milliseconds(
                  raft_election_timeout_interval_min_milliseconds))
{
    std::cout << "I am Candidate" << std::endl;

    schedule_reelection();
}

void RaftCandidateState::schedule_reelection()
{
    std::mt19937 rng(rd_());
    std::uniform_int_distribution<uint> uni(raft_election_timeout_interval_max_milliseconds,
                                            raft_election_timeout_interval_min_milliseconds);
    election_timeout_timer_.expires_from_now(boost::posix_time::milliseconds(
            uni(rng)));

    election_timeout_timer_.async_wait(boost::bind(&RaftCandidateState::start_election, this));
}

void RaftCandidateState::start_election()
{
    nominated_for_leader_ = true;
    std::cout << "v ";
    for (auto &p : peers_)
        {
        p.send_request(s_request_for_vote_message);
        std::cout << ".";
        }
}

void RaftCandidateState::finish_election()
{
    nominated_for_leader_ = false;
    voted_yes_ = 0;
    voted_no_ = 0;
}

void RaftCandidateState::count_vote(bool vote_yes)
{
    if (vote_yes)
        ++ voted_yes_;
    else
        ++voted_no_;

    if (voted_yes_ >= peers_.size() * 2 / 3) // If 2/3rd voted yes this node is the new leader.
        {
        std::cout << "Leader elected" << std::endl;
        finish_election(); // [todo] Transition to RaftLeaderState.
        return;
        }

    schedule_reelection(); // No consensus reached, re-schedule election.
}

// If heartbeat received transition to follower state.
// If request for vote received send YES/NO vote. YES if this node didn't nominate itself to be a leader.
// If vote received count votes and if majority reached transition to leader state if not re-start election.
unique_ptr<RaftState> RaftCandidateState::handle_request(const string& request, string& response)
{
    auto pt = pt_from_json_string(request);

    unique_ptr<Command> command = command_factory_.get_candidate_command(pt, *this);
    response = pt_to_json_string(command->operator()());

    return nullptr;
}
