#ifndef BLUZELLE_RAFTSTATE_H
#define BLUZELLE_RAFTSTATE_H

#include "ApiCommandQueue.h"

#include <string>
#include <memory>
#include <functional>

#include <boost/asio/io_service.hpp>

class PeerList;
class Storage;
class CommandFactory;

enum class RaftStateType
{
    Unknown,
    Leader,
    Follower,
    Candidate
};


class RaftState
{
public:
    static constexpr uint raft_default_heartbeat_interval_milliseconds = 5000;
    static constexpr uint raft_election_timeout_interval_min_milliseconds =
            raft_default_heartbeat_interval_milliseconds * 3;
    static constexpr uint raft_election_timeout_interval_max_milliseconds =
           raft_default_heartbeat_interval_milliseconds * 6;

protected:
    boost::asio::io_service& ios_;

    PeerList& peers_;

    ApiCommandQueue& peer_queue_;

    Storage& storage_;

    CommandFactory& command_factory_;

    std::function<std::string(const std::string&)> handler_;

    std::unique_ptr<RaftState>& next_state_;

public:
    virtual std::unique_ptr<RaftState>
    handle_request(
        const std::string& request,
        std::string& response) = 0;

    RaftState(
        boost::asio::io_service& ios,
        Storage& s,
        CommandFactory& cf,
        ApiCommandQueue& pq,
        PeerList& ps,
        std::function<std::string(const std::string&)> rh,
        std::unique_ptr<RaftState>& ns
    )
    : ios_(ios),
      peers_(ps),
      peer_queue_(pq),
      storage_(s),
      command_factory_(cf),
      handler_(rh),
      next_state_(ns)
    {
    }

    virtual RaftStateType
    get_type() const = 0;

    void
    set_next_state_follower();

    void
    set_next_state_leader();

    void
    set_next_state_candidate();
};

#endif //BLUZELLE_RAFTSTATE_H
