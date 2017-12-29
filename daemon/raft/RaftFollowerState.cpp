#include <iostream>

#include "PeerList.h"
#include "CommandFactory.h"
#include "RaftFollowerState.h"
#include "JsonTools.h"

RaftFollowerState::RaftFollowerState(boost::asio::io_service& ios,
                                       Storage& s,
                                       CommandFactory& cf,
                                       ApiCommandQueue& pq,
                                       PeerList& ps,
                                     function<string(const string&)> rh)
        : RaftState(ios, s, cf, pq, ps, rh),
          election_timeout_timer_(ios_,
                           boost::posix_time::milliseconds(raft_election_timeout_interval_min_milliseconds))
{
    std::cout << "          I am Follower" << std::endl;

    election_timeout_timer_.async_wait(boost::bind(&RaftFollowerState::start_election, this));
}


void RaftFollowerState::start_election()
{
    std::cout << "Starting Leader election" << std::endl;

    // Change state to Candidate. [todo] HOW?
/*
 * If node haven't heard from leader it can start election.
 * Change state to State::candidate and request votes
*/
// Election_Timeout -> time to wait before starting new election (become a candidate)
// Random in 150-300 ms interval

// After Election_Timeout follower becomes candidate and start election term, votes for itself and sends
// Request_Vote messages to other nodes.
// If node hasn't voted for itself or didn't reply to others node Request_Vote it votes "YES" otherwise "NO"
// An resets election timeout (won't start new election).
// When candidate received majority of votes it sets itself as leader.
// The leader sends Append_Entry messages to followers in Heartbeat_Timeout intervals. Followers respond
// If follower don't receive Append_Entry in time alotted new election term starts.
// Handle Split_Vote
}

unique_ptr<RaftState> RaftFollowerState::handle_request(const string& request, string& response)
{
    auto pt = pt_from_json_string(request);

    unique_ptr<Command> command = command_factory_.get_command(pt);
    // If heartbeat command received reset timer.
    /* Rearm timer.
     * election_timeout_timer_.expires_from_now(boost::posix_time::milliseconds(raft_election_timeout_interval_min_milliseconds)
     * */
    response = pt_to_json_string(command->operator()());

    return nullptr;
}
