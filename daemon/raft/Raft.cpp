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

void Raft::run()
{
    raft_state_ = std::make_unique<RaftFollowerState>(ios_,
                                                       storage_,
                                                       command_factory_,
                                                       peer_queue_,
                                                       peers_,
                                                       std::bind(&Raft::handle_request,
                                                              this,
                                                              std::placeholders::_1),
                                                       std::bind(&Raft::set_next_state,
                                                                this,
                                                                 std::placeholders::_1));
}

string Raft::handle_request(const string &req)
{
    std::lock_guard<mutex> lock(raft_state_mutex_); // Requests come from multiple peers. Handle one at a time. Potential bottleneck.

    string resp;

    unique_ptr<RaftState> next_state = raft_state_->handle_request(req, resp); // request handled by current state.

    if (next_state != nullptr) // transition to next state.
        raft_state_.reset(next_state.get());

    return resp;
}




