#include <iostream>
#include <utility>
#include <thread>
#include <sstream>
#include <utility>

#include <boost/lexical_cast.hpp>
#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_io.hpp>
#include <boost/uuid/nil_generator.hpp>

#include "Raft.h"
#include "JsonTools.h"
#include "DaemonInfo.h"
#include "RaftCandidateState.h"
#include "RaftLeaderState.h"
#include "RaftFollowerState.h"

static boost::uuids::uuid s_transaction_id;

DaemonInfo& daemon_info = DaemonInfo::get_instance();

Raft::Raft(boost::asio::io_service &ios)
        : ios_(ios),
          peers_(ios_),
          storage_("./storage_" + daemon_info.get_value<std::string>("name") + ".txt"),
          command_factory_(
                  storage_,
                  peer_queue_)
{
    static boost::uuids::nil_generator nil_uuid_gen;
    s_transaction_id = nil_uuid_gen();
}

void Raft::run() {
    raft_state_ = std::make_unique<RaftCandidateState>(ios_,
                                                       storage_,
                                                       command_factory_,
                                                       peer_queue_,
                                                       peers_); // Starting from candidate state.
}

string Raft::handle_request(const string &req) {
    string response = raft_state_->handle_request(req); // request handled by current state.
    return response;
}



