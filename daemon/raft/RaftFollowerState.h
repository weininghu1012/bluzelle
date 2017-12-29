#ifndef BLUZELLE_RAFTFOLLOWERSTATE_H
#define BLUZELLE_RAFTFOLLOWERSTATE_H

#include <boost/asio/deadline_timer.hpp>

#include "RaftState.h"

class RaftFollowerState : public RaftState {
private:
    boost::asio::deadline_timer election_timeout_timer_; // When expired change state to Candidate.

public:
    RaftFollowerState(boost::asio::io_service& ios,
                       Storage& s,
                       CommandFactory& cf,
                       ApiCommandQueue& pq,
                       PeerList& ps,
                      function<string(const string&)> rh);

    void start_election();

    virtual unique_ptr<RaftState> handle_request(const string& request, string& response);
};

#endif //BLUZELLE_RAFTFOLLOWERSTATE_H
