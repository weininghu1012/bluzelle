#include <iostream>

#include "ApiCommandQueue.h"
#include "CommandFactory.h"
#include "PeerList.h"
#include "RaftLeaderState.h"
#include "JsonTools.h"

static constexpr char s_heartbeat_message[] = "{\"raft\": \"beep\"}";

RaftLeaderState::RaftLeaderState(boost::asio::io_service& ios,
                                 Storage& s,
                                 CommandFactory& cf,
                                 ApiCommandQueue& pq,
                                 PeerList& ps,
                                 function<string(const string&)> rh,
                                 function<void(unique_ptr<RaftState>)> set_next)
        : RaftState(ios, s, cf, pq, ps, rh, set_next),
          heartbeat_timer_(ios_,
                           boost::posix_time::milliseconds(raft_default_heartbeat_interval_milliseconds))
{
    std::cout << "          I am Leader" << std::endl;
    heartbeat_timer_.async_wait(boost::bind(&RaftLeaderState::heartbeat, this));
}

void RaftLeaderState::heartbeat() {
    if (peer_queue_.empty())
        {
        std::cout << "♥ ";
        for (auto &p : peers_)
            {
            p.send_request(s_heartbeat_message);
            std::cout << ".";
            }
        }
    else
        {
        std::cout << "❥ ";
        auto m = peer_queue_.front();
        for (auto &p : peers_)
            {
            p.send_request(m.second);
            std::cout << ".";
            }
        peer_queue_.pop();
        }
    std::cout << std::endl;

    // Re-arm timer.
    heartbeat_timer_.expires_at(
            heartbeat_timer_.expires_at() +
            boost::posix_time::milliseconds(raft_default_heartbeat_interval_milliseconds));
    heartbeat_timer_.async_wait(
            boost::bind(&RaftLeaderState::heartbeat,
                        this));
}


unique_ptr<RaftState> RaftLeaderState::handle_request(const string& request, string& response)
{
    auto pt = pt_from_json_string(request);

    unique_ptr<Command> command = command_factory_.get_command(pt, *this);
    response = pt_to_json_string(command->operator()());

    if (next_state_ != nullptr) // If command execution caused state transition return new state.
        return std::move(next_state_);

    return nullptr;
}
