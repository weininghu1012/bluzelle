#include "PeerList.h"
#include "node/DaemonInfo.h"

#include <iostream>
#include <string>
#include <set>
#include <boost/lexical_cast.hpp>
#include <boost/filesystem.hpp>
#include <boost/beast/core.hpp>
#include <boost/beast/http.hpp>
#include <boost/beast/version.hpp>
#include <boost/asio/connect.hpp>
#include <boost/asio/ip/tcp.hpp>

PeerList::PeerList(
    boost::asio::io_service& ios,
    const std::string& peers_file_name,
    const std::string& peers_url
)
{
    const string& default_peers_file_name{"./peers"};
    //DaemonInfo& daemon_info = DaemonInfo::get_instance();
    const auto& peers = read_peers_from_file(
        (peers_file_name.length() >0 ?
         peers_file_name :
         default_peers_file_name),
        ios);
    std::copy(
        peers.begin(),
        peers.end(),
        std::back_inserter(this->_peers));

    const auto peers_from_url = read_peers_from_url(peers_url, ios);
    std::copy(
        peers_from_url.begin(),
        peers_from_url.end(),
        std::back_inserter(this->_peers));
}

std::vector<Peer>
PeerList::read_peers_from_file(const std::string &filename,
                               boost::asio::io_service& ios)
{
    std::vector<Peer> peers;
    // Read file and create a list of known peers.
    // TODO Move this functionality into an init module.
    boost::filesystem::ifstream file(filename);
    string peer_info; // name=Host:port [todo] Pick a format for node info storage.
    while (getline(file, peer_info))
        {
        if (peer_info.front() != ';' && !peer_info.empty()) // Skip commented lines.
            {
            NodeInfo n;
            n.name() = peer_info.substr(0, peer_info.find('='));
            n.host() = peer_info.substr(peer_info.find('=') + 1, peer_info.find(':') - peer_info.find('=') - 1);
            n.port() = boost::lexical_cast<uint16_t>(peer_info.substr(peer_info.find(':') + 1));
            peers.emplace_back(Peer(ios, n));
            }
        }
    return peers;
}

std::vector<Peer>
PeerList::read_peers_from_url(const std::string &url,
                              boost::asio::io_service& ios)
{
    using tcp = boost::asio::ip::tcp;       // from <boost/asio/ip/tcp.hpp>
    namespace http = boost::beast::http;    // from <boost/beast/http.hpp>
    std::vector<Peer> peers;



    // https://www.dropbox.com/s/3florzyurredq2q/peers.txt?dl=1"
    auto const host = "localhost";
    auto const port = "8080";
    auto const target = "/peers.txt";
    int version = 11;

    boost::asio::io_context ioc;

    tcp::resolver resolver{ioc};
    tcp::socket socket{ioc};

    auto const results = resolver.resolve(host, port);

    boost::asio::connect(socket, results.begin(), results.end());

    http::request<http::string_body> req{http::verb::get, target, version};
    req.set(http::field::host, host);
    req.set(http::field::user_agent, BOOST_BEAST_VERSION_STRING);

    http::write(socket, req);

    boost::beast::flat_buffer buffer;

    // Declare a container to hold the response
    http::response<http::dynamic_body> res;

    // Receive the HTTP response
    http::read(socket, buffer, res);

    // Write the message to standard out
    std::cout << res << std::endl;

    // Gracefully close the socket
    boost::system::error_code ec;
    socket.shutdown(tcp::socket::shutdown_both, ec);













    return peers;
}



