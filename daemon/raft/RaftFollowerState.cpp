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
          heartbeat_timeout_timer_(ios_,
                           boost::posix_time::milliseconds(raft_election_timeout_interval_min_milliseconds))
{
    std::cout << "          I am Follower" << std::endl;

    heartbeat_timeout_timer_.async_wait(boost::bind(&RaftFollowerState::start_election, this));
}


void RaftFollowerState::start_election()
{
    std::cout << "Starting Leader election" << std::endl;

    // Need to change state to Cndidate.
}

void RaftFollowerState::rearm_heartbet_timeout_timer()
{
    heartbeat_timeout_timer_.expires_from_now(
            boost::posix_time::milliseconds(raft_election_timeout_interval_min_milliseconds));

    heartbeat_timeout_timer_.async_wait(boost::bind(&RaftFollowerState::start_election, this));

}

unique_ptr<RaftState> RaftFollowerState::handle_request(const string& request, string& response)
{
    auto pt = pt_from_json_string(request);

    unique_ptr<Command> command = command_factory_.get_follower_command(pt, *this);
    response = pt_to_json_string(command->operator()());

    return nullptr;
}
