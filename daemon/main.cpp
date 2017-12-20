#include "CommandLineOptions.h"
#include "Listener.h"
#include "WebSocketServer.h"
#include "TokenBalance.hpp"
#include "node/Singleton.h"
#include "node/DaemonInfo.h"
#include "CommandLineOptions.h"
#include "Node.h"


#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_generators.hpp>
#include <boost/uuid/uuid_io.hpp>
#include <boost/lexical_cast.hpp>

#include <iostream>
#include <boost/thread.hpp>

constexpr int s_uint_minimum_required_token_balance = 100;
constexpr char s_etherscan_api_token_envar_name[] = "ETHERSCAN_IO_API_TOKEN";

void initialize_daemon()
{
    // TODO: Mehdi, put your config file work here.
    // If we don't have a node id in the config file, then generate one here
    // Mehdi, for now we just generate a new  node id everytime we restart the node,
    // but we should really check the config file first.
    boost::uuids::basic_random_generator<boost::mt19937> gen;
    const boost::uuids::uuid node_id{gen()};
    DaemonInfo::get_instance().set_value("node_id", boost::lexical_cast<std::string>(node_id));
}

int parse_command_line(
        int argc,
        char *argv[]
)
{
    CommandLineOptions options;

    if (!options.parse(argc, argv))
        {
        std::cout << options.get_last_error() << std::endl;
        return 1;
        }

    string address = options.get_address();
    if (!CommandLineOptions::is_valid_ethereum_address(address))
        {
        std::cout << address << " is not a valid Ethereum address." << std::endl;
        return 1;
        }
    DaemonInfo::get_instance().set_value( "ethereum_address", address);

    uint port = options.get_port();
    if (!CommandLineOptions::is_valid_port(port))
        {
        std::cout << port << " is not a valid port. Please pick a port in 49152 - 65535 range" << std::endl;
        return 1;
        }
    DaemonInfo::get_instance().set_value("port",port);
    DaemonInfo::get_instance().set_value("name", "Node_running_on_port_" + std::to_string(port));
    return 0;
}


int main(int argc, char *argv[]) {
    initialize_daemon();
    parse_command_line(argc, argv);

    auto token = getenv(s_etherscan_api_token_envar_name);
    if (token == nullptr)
        {
        std::cout << "Environment variable " << s_etherscan_api_token_envar_name
                  << " containing etherscan.io API token must be set" << std::endl;
        return 1;
        }

    DaemonInfo& daemon_info = DaemonInfo::get_instance();

    uint64_t balance = get_token_balance(daemon_info.get_value<std::string>("ethereum_address"), token);
    if (balance < s_uint_minimum_required_token_balance)
        {
        std::cout << "Insufficient BZN token balance. Te balance of "
                  << s_uint_minimum_required_token_balance << "BZN required to run node. Your balance is "
                  << balance << "BZN" << std::endl;
        return 1;
        }


    unsigned short port = daemon_info.get_value<unsigned short>("port");

    std::cout << "Running node with ID: " << daemon_info.get_value<std::string>("node_id") << "\n"
              << " Ethereum Address ID: " << daemon_info.get_value<std::string>("ethereum_address") << "\n"
              << "             on port: " << port << "\n"
              << "       Token Balance: " << balance << " BLZ\n"
              << std::endl;
              //<< " config path: " << node_info.get_value("node_id") << std::endl;

    std::shared_ptr<Listener> listener;
    boost::thread websocket_thread(WebSocketServer("127.0.0.1", port + 1000, listener, 1));



//    NodeInfo info = NodeInfo::this_node();
//    info.port_ = port;
//    info.address_ = address;
//    info.config_ = options.get_config();
//    info.name_ = "Node_running_on_port_" + boost::lexical_cast<string>(port);


    boost::asio::io_service ios; // I/O service to use.
    boost::thread_group tg;


    Node this_node(ios);
    try
        {
        this_node.run();
        for (unsigned i = 0; i < boost::thread::hardware_concurrency(); ++i)
            {
            tg.create_thread(boost::bind(&boost::asio::io_service::run, &ios));
            }
        this_node.run();
        }
    catch (std::exception& ex)
        {
        std::cout << ex.what() << std::endl;
        return 1;
        }

    return 0;
}