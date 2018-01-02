#ifndef BLUZELLE_RAFTSTATE_H
#define BLUZELLE_RAFTSTATE_H

#include <string>
#include <memory>

using std::string;
using std::unique_ptr;
using std::function;

#include <boost/asio/io_service.hpp>

class PeerList;
class ApiCommandQueue;
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
    static constexpr uint raft_default_heartbeat_interval_milliseconds = 3000;
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

    function<string(const string&)> handler_;
    function<void(void)> timer_rearmer_;

public:
    virtual unique_ptr<RaftState> handle_request(const string& request, string& response) = 0;

    virtual void rearm_timer()
    {
        if (timer_rearmer_ != nullptr)
            timer_rearmer_();
    }

    RaftState(boost::asio::io_service& ios,
              Storage& s,
              CommandFactory& cf,
              ApiCommandQueue& pq,
              PeerList& ps,
              function<string(const string&)> rh,
              function<void(void)> tr)
    : ios_(ios),
      storage_(s),
      command_factory_(cf),
      peer_queue_(pq),
      peers_(ps),
      handler_(rh),
      timer_rearmer_(tr)
    {

    }

    virtual RaftStateType get_type() const = 0;

    void set_next_state_follower();

    void set_next_state_leader();

    void set_next_state_candidate();

    unique_ptr<RaftState> next_state_;
};

#endif //BLUZELLE_RAFTSTATE_H
