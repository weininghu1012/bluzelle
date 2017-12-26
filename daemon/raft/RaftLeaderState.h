#ifndef BLUZELLE_RAFTLEADERSTATE_H
#define BLUZELLE_RAFTLEADERSTATE_H

#include <boost/asio/deadline_timer.hpp>

#include "RaftState.h"

class RaftLeaderState : public RaftState {
private:
    static constexpr char s_heartbeat_message[] = "({\"raft\":\"beep\"})";

    boost::asio::deadline_timer heartbeat_timer_;
    void heartbeat();

public:
    RaftLeaderState(boost::asio::io_service& ios,
                    Storage& s,
                    CommandFactory& cf,
                    ApiCommandQueue& pq,
                    PeerList& ps);

    virtual string handle_request(const string& r);
};

#endif //BLUZELLE_RAFTLEADERSTATE_H
