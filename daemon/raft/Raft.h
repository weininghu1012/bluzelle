#ifndef BLUZELLE_RAFT_H
#define BLUZELLE_RAFT_H

#include "PeerList.h"
#include "NodeInfo.hpp"
#include "Storage.h"
#include "CommandFactory.h"
#include "ApiCommandQueue.h"
#include "DaemonInfo.h"
#include "RaftState.h"

#include <string>
#include <thread>
#include <queue>
#include <utility>
#include <boost/property_tree/ptree.hpp>

using std::queue;
using std::pair;


class Raft {
    boost::asio::io_service& ios_;

    PeerList peers_;                    // List of known peers.
    ApiCommandQueue peer_queue_;        // Keeps data to be sent to peers.
    Storage storage_;                   // Where the RAFTs log is replicated.
    CommandFactory command_factory_;

    unique_ptr<RaftState> raft_state_; // There are 3 RAFT states: Candidate, Follower and Leader.
    // Leader shouldn't change state.
    // Candidate can become Leader of Follower
    // Follower can only become Candidate

public:
    Raft(boost::asio::io_service& ios);

    void run();

    string handle_request(const string& req);
};

#endif //BLUZELLE_RAFT_H
