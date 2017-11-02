#ifndef KEPLER_SESSION_H
#define KEPLER_SESSION_H

#include "services/Services.h"
#include "services/Ping.h"
#include "services/GetAllNodes.h"
#include "services/CountNodes.h"
#include "services/SetMaxNodes.h"
#include "services/GetMaxNodes.h"
#include "services/GetMinNodes.h"
#include "services/UpdateNodes.h"
#include "services/RemoveNodes.h"

#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/strand.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <algorithm>
#include <cstdlib>
#include <functional>
#include <iostream>
#include <memory>
#include <string>
#include <thread>
#include <vector>

using tcp = boost::asio::ip::tcp;               // from <boost/asio/ip/tcp.hpp>
namespace websocket = boost::beast::websocket;  // from <boost/beast/websocket.hpp>
namespace pt = boost::property_tree;

Nodes* get_all_nodes();
Nodes* get_removed_nodes();

enum class SessionState
{
    Unknown,
    Starting,
    Started,
    Finishing,
    Finished,
};

void
fail(boost::system::error_code ec, char const* what);

class Session : public std::enable_shared_from_this<Session>
{
    websocket::stream<tcp::socket>  ws_;
    boost::asio::io_service::strand strand_;
    boost::beast::multi_buffer buffer_;
    Services                        services_;

    SessionState state_ = SessionState::Unknown;
    size_t seq = 0;

    const unsigned int send_interval_millisecs_ = 2000;

public:
    // Take ownership of the socket
    explicit
    Session(tcp::socket socket)
    : ws_(std::move(socket))
    , strand_(ws_.get_io_service())
    {
        auto nodes = get_all_nodes();
        auto removedNodes = get_removed_nodes();

        services_.add_service("ping", new Ping());
        services_.add_service("getAllNodes", new GetAllNodes(nodes));
        services_.add_service("countNodes", new CountNodes(nodes));
        services_.add_service("setMaxNodes", new SetMaxNodes());
        services_.add_service("getMaxNodes", new GetMaxNodes());
        services_.add_service("getMinNodes", new GetMinNodes());
        services_.add_service("updateNodes", new GetAllNodes(nodes));
        services_.add_service("removeNodes", new RemoveNodes(removedNodes));

    }

    // Start the asynchronous operation
    void
    run()
    {
        // Accept the websocket handshake
        ws_.async_accept(
                strand_.wrap(std::bind(
                        &Session::on_accept,
                        shared_from_this(),
                        std::placeholders::_1)));
    }

    void
    on_accept(boost::system::error_code ec)
    {
        if(ec)
            return fail(ec, "accept");

        // Read a message
        do_read();
    }

    void
    do_read()
    {
        // Read a message into our buffer
        ws_.async_read(
                buffer_,
                strand_.wrap(std::bind(
                        &Session::on_read,
                        shared_from_this(),
                        std::placeholders::_1,
                        std::placeholders::_2)));
    }

    void
    on_read(
            boost::system::error_code ec,
            std::size_t bytes_transferred)
    {
        boost::ignore_unused(bytes_transferred);

        // This indicates that the session was closed
        if(ec == websocket::error::closed)
            return;

        if(ec)
            fail(ec, "read");


        ///////////////////////////////////////////////////////////////////////
        // Services handler
        std::stringstream ss;
        ss << boost::beast::buffers(buffer_.data());

        pt::ptree request;
        pt::read_json(ss,request);

        std::string command = request.get<std::string>("cmd");

        std::cout<< " **** command:" << command << "\n";

        std::string response = services_(command,ss.str());

        std::cout
                << " ******* response ["
                << response
                << "]\n";

        ws_.async_write(
                boost::asio::buffer(response),
                std::bind(
                        &Session::on_write,
                        shared_from_this(),
                        std::placeholders::_1,
                        std::placeholders::_2));


        state_ = set_state(request);
        seq = request.get<int>("seq");
    }

    void
    on_write(
            boost::system::error_code ec,
            std::size_t bytes_transferred)
    {
        boost::ignore_unused(bytes_transferred);

        if(ec)
            return fail(ec, "write");

        // Clear the buffer
        buffer_.consume(buffer_.size());

        if (state_ == SessionState::Started)
            timer_start(std::bind(&Session::update_nodes, this), send_interval_millisecs_);
            //boost::async(boost::bind(&Session::update_nodes, this));

        // Do another read
        do_read();
    }

    SessionState set_state(const pt::ptree& request)
    {
        if (request.get<std::string>("cmd") == "getMaxNodes")
            return SessionState::Starting;

        if (request.get<std::string>("cmd") == "getMinNodes")
            return SessionState::Started;

        return state_;
    }


    void timer_start(std::function<void(void)> func, unsigned int interval)
    {
        std::thread([func, interval]() {
            while (true)
            {
                func();
                std::this_thread::sleep_for(std::chrono::milliseconds(interval));
            }
        }).detach();
    }

    void update_nodes()
    {
        auto request = boost::format("{\"seq\": %d}") % ++seq;
        std::string response = services_("getAllNodes", boost::str(request));

        if (response.length() > 0) { // Send updated nodes status.
            std::cout << " ******* " << std::endl << response << std::endl;
            ws_.write(boost::asio::buffer(response));
        }

        request = boost::format("{\"seq\": %d}") % ++seq;
        response = services_("removeNodes", boost::str(request));

        if (response.length() > 0) { // Send removed nodes.
            std::cout << " ******* " << std::endl << response << std::endl;
            ws_.write(boost::asio::buffer(response));
        }
    }
};


#endif //KEPLER_SESSION_H
