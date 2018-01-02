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
                                     function<string(const string&)> rh,
                                     function<void(void)> tr)
        : RaftState(ios, s, cf, pq, ps, rh, tr)
{
    std::cout << "          I am Follower" << std::endl;
}


unique_ptr<RaftState> RaftFollowerState::handle_request(const string& request, string& response)
{
    auto pt = pt_from_json_string(request);

    unique_ptr<Command> command = command_factory_.get_command(pt, *this);
    response = pt_to_json_string(command->operator()());

    if (next_state_ != nullptr)
        return std::move(next_state_);

    return nullptr;
}
