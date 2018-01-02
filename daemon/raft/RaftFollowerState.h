#ifndef BLUZELLE_RAFTFOLLOWERSTATE_H
#define BLUZELLE_RAFTFOLLOWERSTATE_H

#include <boost/asio/deadline_timer.hpp>

#include "RaftState.h"

class RaftFollowerState : public RaftState {
private:

public:
    RaftFollowerState(boost::asio::io_service& ios,
                       Storage& s,
                       CommandFactory& cf,
                       ApiCommandQueue& pq,
                       PeerList& ps,
                       function<string(const string&)> rh,
                       function<void(void)> tr);

    virtual unique_ptr<RaftState> handle_request(const string& request, string& response) override;

    virtual RaftStateType get_type() const override { return RaftStateType::Follower; }
};

#endif //BLUZELLE_RAFTFOLLOWERSTATE_H
