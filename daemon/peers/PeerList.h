#ifndef BLUZELLE_PEERLIST_H
#define BLUZELLE_PEERLIST_H

#include "Peer.h"
#include "NodeInfo.hpp"

#include <vector>

class PeerList {
    std::vector<Peer> _peers;

    std::vector<Peer>
    read_peers_from_file(const std::string& filename, boost::asio::io_service& ios);

    std::vector<Peer>
    read_peers_from_url(const std::string& url, boost::asio::io_service& ios);

public:

    // TODO RHN - I don't know why we need to have the io service here, if we
    // only use one instance, why copy it? There must be some reason...
    PeerList(
        boost::asio::io_service& ios,
        const std::string& peers_file_name = "",
        const std::string& peers_url = ""
    );

    std::vector<Peer>&
    peers()
    {
        return _peers;
    }
};

#endif //BLUZELLE_PEERLIST_H
