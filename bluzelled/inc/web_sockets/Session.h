#ifndef KEPLER_SESSION_H
#define KEPLER_SESSION_H

#include "services/Services.h"
#include "services/Ping.h"
#include "services/GetAllNodes.h"
#include "services/CountNodes.h"
#include "services/SetMaxNodes.h"

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

void
fail(boost::system::error_code ec, char const* what);

class Session : public std::enable_shared_from_this<Session>
{
    websocket::stream<tcp::socket>  ws_;
    boost::asio::io_service::strand strand_;
    boost::beast::multi_buffer buffer_;
    Services                        services_;

public:
    // Take ownership of the socket
    explicit
    Session(tcp::socket socket)
    : ws_(std::move(socket))
    , strand_(ws_.get_io_service())
    {
        auto nodes = get_all_nodes();
        services_.add_service("ping", new Ping());
        services_.add_service("getAllNodes", new GetAllNodes(nodes));
        services_.add_service("countNodes", new CountNodes(nodes));
        services_.add_service("setMaxNodes", new SetMaxNodes());

        //Nodes get_all_nodes()




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
//        std::string data = request.get<std::string>("data");
//        long seq = request.get<long>("seq");


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




        ///////////////////////////////////////////////////////////////////////
        // Echo the message
        //ws_.text(ws_.got_text());

//        ws_.async_write(
//                buffer_.data(),
//                strand_.wrap(std::bind(
//                        &Session::on_write,
//                        shared_from_this(),
//                        std::placeholders::_1,
//                        std::placeholders::_2)));
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

        // Do another read
        do_read();
    }
};


#endif //KEPLER_SESSION_H
