#ifndef BLUZELLE_RAFTCANDIDATESTATE_H
#define BLUZELLE_RAFTCANDIDATESTATE_H

#include "RaftState.h"

#include <boost/asio/deadline_timer.hpp>
#include <random>

class RaftCandidateState : public RaftState
{
private:
    std::random_device rd_;

    boost::asio::deadline_timer election_timeout_timer_;

    void
    schedule_election();

    void
    start_election(const boost::system::error_code &e);

    void
    finish_election();

    bool nominated_for_leader_;

    uint16_t voted_yes_;

    uint16_t voted_no_;

public:
    RaftCandidateState(
        boost::asio::io_service &ios,
        Storage &s,
        CommandFactory &cf,
        ApiCommandQueue &pq,
        PeerList &ps,
        function<string(const string &)> rh,
        unique_ptr<RaftState> &ns
    );

    ~RaftCandidateState();

    bool
    nominated_self();

    void
    count_vote(bool vote_yes);

    unique_ptr<RaftState>
    handle_request(
        const string &request,
        string &response) override;

    virtual
    RaftStateType
    get_type() const override;

    void
    cancel_election();

    uint16_t
    yes_votes() const;

    uint16_t
    no_votes() const;

};

#endif //BLUZELLE_RAFTCANDIDATESTATE_H
