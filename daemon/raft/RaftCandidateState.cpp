#include <iostream>

#include "RaftCandidateState.h"
#include "JsonTools.h"

RaftCandidateState::RaftCandidateState(boost::asio::io_service& ios,
                                       Storage& s,
                                       CommandFactory& cf,
                                       ApiCommandQueue& pq,
                                       PeerList& ps)
        : RaftState(ios, s, cf, pq, ps)
{
    std::cout << "I am Candidate" << std::endl;
}

string RaftCandidateState::handle_request(const string& req)
{
    auto pt = pt_from_json_string(req);

    unique_ptr<Command> command = command_factory_.get_command(pt);
    string response = pt_to_json_string(command->operator()());

    return response;
}
