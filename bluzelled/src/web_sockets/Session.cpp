#include "web_sockets/Session.h"

#include <boost/date_time/posix_time/posix_time.hpp>

#include "services/Ping.h"
#include "services/GetAllNodes.h"
#include "services/CountNodes.h"
#include "services/SetMaxNodes.h"
#include "services/GetMaxNodes.h"
#include "services/GetMinNodes.h"
#include "services/UpdateNodes.h"
#include "services/RemoveNodes.h"

Nodes *get_all_nodes();

static std::string fix_json_numbers(const std::string &json_str) {
    boost::regex re("\\\"([0-9]+\\.{0,1}[0-9]*)\\\"");
    return  boost::regex_replace(json_str, re, "$1");
}

// Report a failure
void
fail(boost::system::error_code ec, char const *what) {
    std::cerr << what << ": " << ec.message() << "\n";
}

Session::Session(tcp::socket socket)
        : ws_(std::move(socket)), strand_(ws_.get_io_service()) {
    auto nodes = get_all_nodes();

    services_.add_service("ping", new Ping());
    services_.add_service("getAllNodes", new GetAllNodes(nodes));
    services_.add_service("countNodes", new CountNodes(nodes));
    services_.add_service("setMaxNodes", new SetMaxNodes());
    services_.add_service("getMaxNodes", new GetMaxNodes());
    services_.add_service("getMinNodes", new GetMinNodes());
    services_.add_service("updateNodes", new GetAllNodes(nodes));
}

// Start the asynchronous operation
void
Session::run() {
    // Accept the websocket handshake
    ws_.async_accept(
            strand_.wrap(std::bind(
                    &Session::on_accept,
                    shared_from_this(),
                    std::placeholders::_1)));
}

void
Session::on_accept(boost::system::error_code ec) {
    if (ec)
        return fail(ec, "accept");

    // Read a message
    do_read();
}

void
Session::do_read() {
    // Read a message into our buffer
    ws_.async_read(
            read_buffer_,
            strand_.wrap(std::bind(
                    &Session::on_read,
                    shared_from_this(),
                    std::placeholders::_1,
                    std::placeholders::_2)));
}

void
Session::on_read(
        boost::system::error_code ec,
        std::size_t bytes_transferred) {
    boost::ignore_unused(bytes_transferred);

    // This indicates that the session was closed
    if (ec == websocket::error::closed)
        return;

    if (ec)
        fail(ec, "read");

    std::stringstream ss;
    pt::ptree request;

    try
        {
        ss << boost::beast::buffers(read_buffer_.data());
        pt::read_json(ss, request);
        read_buffer_.consume(read_buffer_.size());
        }
    catch (pt::json_parser_error& e)
        {
        std::cout << e.what() << "Invalid JSON: [" << ss.str() << "]" << std::endl;
        read_buffer_.consume(read_buffer_.size());
        return;
        }

    std::string command = request.get<std::string>("cmd");
    std::string response = services_(command, ss.str());

    std::cout << " **** command:" << command << "\n";
    std::cout << " ******* response [" << response << "]\n";

    ws_.async_write(
            boost::asio::buffer(response),
            strand_.wrap(std::bind(
                    &Session::on_write,
                    shared_from_this(),
                    std::placeholders::_1,
                    std::placeholders::_2)));


    seq = request.get<int>("seq");
}

void
Session::on_write(
        boost::system::error_code ec,
        std::size_t bytes_transferred) {
    boost::ignore_unused(bytes_transferred);

    if (ec)
        return fail(ec, "write");

    // Do another read
    do_read();
}


void
Session::send_remove_nodes(
        const std::string &name) {

    pt::ptree out_tree, array, child1;
    out_tree.put("cmd", "removeNodes");
    child1.put("", name);
    array.push_back(std::make_pair("", child1));
    out_tree.add_child("data", array);
    //out_tree.put("seq", seq);

    std::stringstream ss;
    ss.str("");
    auto d = out_tree.get_child("data.");
    pt::write_json(ss, out_tree);

    auto response = fix_json_numbers(ss.str());
    if (response.length() > 0) // Send removed nodes.
        {
        std::cout << " ******* " << std::endl << response << std::endl;
        boost::mutex::scoped_lock lock(ws_mutex_);
        ws_.write(boost::asio::buffer(response));
        }
}

void
Session::send_update_nodes(
        const std::string &name) {

    pt::ptree out_tree, array, child1;
    out_tree.put("cmd", "updateNodes");
    child1.put("address", name);
    child1.put<long>("available", 1000);
    child1.put<long>("used", 580);
    //child1.put<bool>("isLeader", false);
    array.push_back(std::make_pair("", child1));
    out_tree.add_child("data", array);
    //out_tree.put("seq", seq);

    std::stringstream ss;
    ss.str("");
    auto d = out_tree.get_child("data.");
    pt::write_json(ss, out_tree);

    auto response = fix_json_numbers(ss.str());
    if (response.length() > 0)
        {
        std::cout << " ******* " << std::endl << response << std::endl;
        boost::mutex::scoped_lock lock(ws_mutex_);
        ws_.write(boost::asio::buffer(response));
        }
}

/*void
Session::send_message(
        const std::string &from, const std::string &to, const std::string &message) {

    auto f = boost::format("{\"cmd\":\"messages\",\"data\":[{\"srcAddr\":\"%s\", \"dstAddr\":\"%s\", \"timestamp\":\"%s\", \"body\":%s}]}")
             % from % to % timestamp() % message;

    std::string response = boost::str(f);

    std::cout << " ******* " << std::endl << response << std::endl;
    write_async(boost::asio::buffer(response));
}

void
Session::send_log(
        const std::string &name, int timer, int entry, const std::string& log) {

    auto f = boost::format("{\"cmd\":\"log\",\"data\":[{\"timer_no\":%d, \"entry_no\":%d, \"timestamp\":\"%s\", \"message\":\"%s\"}]}")
             % timer % entry % timestamp() % log;

    std::string response = boost::str(f);

    std::cout << " ******* " << std::endl << response << std::endl;
    write_async(boost::asio::buffer(response));
}

std::string
Session::timestamp() {
    static std::locale loc(
            std::wcout.getloc(),
            new boost::posix_time::time_facet("%Y-%m-%dT%H:%M:%sZ"));

    std::basic_stringstream<char> ss;

    ss.imbue(loc);
    ss << boost::posix_time::microsec_clock::universal_time();

    return ss.str();
}*/