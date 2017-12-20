#include "PeerList.h"
#include "node/DaemonInfo.h"

#include <iostream>
#include <string>
#include <boost/lexical_cast.hpp>

PeerList::PeerList(boost::asio::io_service& ios)
{
    std::cerr << "ios [" << &ios << "] is unused." << std::endl;
    // Hardcoded list of peers.
    // TODO: I rewrote this section to create a list of 5 peer nodes that does not contain the current node. -Rich
    ushort leader_port =  58000; // One node starts on port 58000 and become leader.
    DaemonInfo& daemon_info = DaemonInfo::get_instance();
    NodeInfo n;
    for (int i = 0; i < 6; ++i) // Create 5 more followers.
        {
        const int other_port = leader_port +i;
        if(other_port != daemon_info.get_value<int>("port"))
            {
            n.set_value("port", daemon_info.get_value<int>("port") + i);
            n.set_value("name", "_node_port_" + n.get_value<std::string>("port"));
            this->emplace_back(Peer(ios, n));
            //this->emplace_back(ios, n);
            }
        }
}
