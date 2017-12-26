#ifndef BLUZELLE_RAFTCANDIDATESTATE_H
#define BLUZELLE_RAFTCANDIDATESTATE_H

#include "RaftState.h"

class RaftCandidateState : public RaftState {
public:
    RaftCandidateState(boost::asio::io_service& ios,
                       Storage& s,
                       CommandFactory& cf,
                       ApiCommandQueue& pq,
                       PeerList& ps);

    virtual string handle_request(const string& r);
};

#endif //BLUZELLE_RAFTCANDIDATESTATE_H
