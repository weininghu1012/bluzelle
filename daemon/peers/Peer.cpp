#include "Peer.h"
#include "DaemonInfo.h"

#include <boost/asio/connect.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <boost/lexical_cast.hpp>

#include <boost/beast/websocket.hpp>

using std::shared_ptr;


string Peer::send_request(const string& req) {
    if (session_ == nullptr) // Check if we don't have a session.
        {
        DaemonInfo& daemon_info = DaemonInfo::get_instance();
        try
            {
            boost::asio::ip::tcp::resolver resolver(ios_);
            boost::beast::websocket::stream<boost::asio::ip::tcp::socket> ws{ios_};

            // Resolve, connect, handshake.

            auto lookup = resolver.resolve(
                    {
                            daemon_info.get_value<std::string>("host"),
                            daemon_info.get_value<string>("port")
                    }
            );
            boost::asio::connect(ws.next_layer(), lookup);
            ws.handshake(daemon_info.get_value<string>("host"), "/");


            session_ = std::make_shared<PeerSession>(std::move(ws)); // Store it for future use.
            }
        catch (std::exception& ex)
            {
            std::cout << "Cannot connect to "
                      << daemon_info.get_value<string>("host") << ":"
                      << daemon_info.get_value<string>("port") << " '"
                      << ex.what() << "'" << std::endl;
            }
        catch (...)
            {
            std::cout << "Unhandled exception." << std::endl;
            }
        }

    if (session_ != nullptr) // Check again in case we just created a session.
        {
        session_->write_async(req);
        }
    else
        {
        std::cout << "No session to send request to" << std::endl;
        }

    return string();
}
