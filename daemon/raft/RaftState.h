#ifndef BLUZELLE_RAFTSTATE_H
#define BLUZELLE_RAFTSTATE_H

#include <string>
using std::string;

#include "PeerList.h"
#include "Storage.h"
#include "CommandFactory.h"
#include "ApiCommandQueue.h"


class RaftState {
protected:
    static constexpr uint raft_default_heartbeat_interval_milliseconds = 1000;
    static constexpr uint raft_election_timeout_interval_min_milliseconds =
            raft_default_heartbeat_interval_milliseconds * 3;
    static constexpr uint raft_election_timeout_interval_max_milliseconds =
            raft_default_heartbeat_interval_milliseconds * 6;

    boost::asio::io_service& ios_;

    PeerList& peers_;
    ApiCommandQueue& peer_queue_;
    Storage& storage_;
    CommandFactory& command_factory_;

public:
    virtual string handle_request(const string& r) = 0;

    RaftState(boost::asio::io_service& ios,
              Storage& s,
              CommandFactory& cf,
              ApiCommandQueue& pq,
              PeerList& ps)
    : ios_(ios),
      storage_(s),
      command_factory_(cf),
      peer_queue_(pq),
      peers_(ps)
    {

    }
};

#endif //BLUZELLE_RAFTSTATE_H
