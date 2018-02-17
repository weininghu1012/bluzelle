#include "PeerList.h"
#include "node/DaemonInfo.h"
#include "URL.h"

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
#include <boost/regex.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/algorithm/string_regex.hpp>

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

    const auto peers_from_url = read_peers_from_url(
        peers_url,
        ios);

    std::copy(
        peers_from_url.begin(),
        peers_from_url.end(),
        std::back_inserter(this->_peers));
}


template <typename S>
std::vector<Peer>
peers_from_stream(S& instream,
                  boost::asio::io_service& ios)
{
    std::vector<Peer> peers;
    std::string line;
    while(getline(instream,line))
        {
        boost::trim(line);
        if (';' != line.at(0))
            {
            std::vector<std::string> parts;
            boost::split(parts, line, boost::is_any_of("=:"));
            NodeInfo n;
            n.name() = parts[0];
            n.host() = parts[1];
            n.port() = boost::lexical_cast<uint16_t >(parts[2]);
            peers.emplace_back(Peer(ios, n));
            }
        }
    return peers;
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
PeerList::read_peers_from_url(const std::string &url_string,
                              boost::asio::io_service& ios)
{
    std::vector<Peer> peers;
    if(url_string.size()>0)
        {
        using tcp = boost::asio::ip::tcp;       // from <boost/asio/ip/tcp.hpp>
        namespace http = boost::beast::http;    // from <boost/beast/http.hpp>
        URL url(url_string);
        const int version = 11;

        boost::asio::io_context ioc;
        tcp::resolver resolver{ioc};
        tcp::socket socket{ioc};

        auto const results = resolver.resolve(
            url.get_host(),
            boost::lexical_cast<std::string>(url.get_port())
        );

        boost::asio::connect(socket, results.begin(), results.end());

        http::request<http::string_body> req{http::verb::get, url.get_target(), version};
        req.set(http::field::host, url.get_host());
        req.set(http::field::user_agent, BOOST_BEAST_VERSION_STRING);

        http::write(socket, req);

        boost::beast::flat_buffer buffer;

        // Declare a container to hold the response
        http::response<http::dynamic_body> res;

        // Receive the HTTP response
        http::read(socket, buffer, res);

        std::stringstream peer_stream(boost::beast::buffers_to_string(res.body().data()));
        peers = peers_from_stream(peer_stream,ios);
        // Gracefully close the socket
        boost::system::error_code ec;
        socket.shutdown(tcp::socket::shutdown_both, ec);
        }
    return peers;
}



