#ifndef BLUZELLE_DAEMONINFO_H
#define BLUZELLE_DAEMONINFO_H

#include "node/NodeInfo.hpp"
#include "node/Singleton.h"

#include <raft/RaftState.h>
#include <vector>
#include <boost/uuid/uuid.hpp>

using namespace std;

class
DaemonInfo final :
    public Singleton<DaemonInfo>
{
    NodeInfo            node_info_;

    string              ethereum_address_;

    boost::uuids::uuid  id_;

    uint64_t            ropsten_token_balance_;

    friend class Singleton<DaemonInfo>;

    DaemonInfo() = default;

    RaftStateType raft_state_ = RaftStateType::Unknown;

public:

    boost::uuids::uuid&
    id();

    string&
    host_name();

    string&
    host_ip();

    uint16_t&
    host_port();

    string&
    ethereum_address();

    uint64_t&
    ropsten_token_balance();

    RaftStateType&
    raft_state();
};

#endif //BLUZELLE_DAEMONINFO_H
