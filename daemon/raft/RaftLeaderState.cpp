#include <iostream>

#include "RaftLeaderState.h"
#include "JsonTools.h"

constexpr char RaftLeaderState::s_heartbeat_message[];

RaftLeaderState::RaftLeaderState(boost::asio::io_service& ios,
                                 Storage& s,
                                 CommandFactory& cf,
                                 ApiCommandQueue& pq,
                                 PeerList& ps)
        : RaftState(ios, s, cf, pq, ps),
          heartbeat_timer_(ios_,
                           boost::posix_time::milliseconds(raft_default_heartbeat_interval_milliseconds))
{
    std::cout << "I am Leader" << std::endl;
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


string RaftLeaderState::handle_request(const string& req)
{
    auto pt = pt_from_json_string(req);

    unique_ptr<Command> command = command_factory_.get_command(pt);
    string response = pt_to_json_string(command->operator()());

    return response;
}
