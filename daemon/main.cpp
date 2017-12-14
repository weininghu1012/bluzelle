#include "CommandLineOptions.h"
#include "Listener.h"
#include "WebSocketServer.h"

#include "TokenBalance.hpp"


 constexpr int s_uint_minimum_required_token_balance = 100;
 constexpr char s_etherscan_api_token_envar_name[] = "ETHERSCAN_IO_API_TOKEN";

#include <iostream>
#include <boost/thread.hpp>

int main(int argc, char *argv[]) {
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

    uint port = options.get_port();
    if (!CommandLineOptions::is_valid_port(port))
        {
        std::cout << port << " is not a valid port. Please pick a port in 49152 - 65535 range" << std::endl;
        return 1;
        }

    auto token = getenv(s_etherscan_api_token_envar_name);
    if (token == nullptr)
        {
        std::cout << "Environment variable " << s_etherscan_api_token_envar_name
                  << " containing etherscan.io API token must be set" << std::endl;
        return 1;
        }

    uint64_t balance = get_token_balance(address, token);
    if (balance < s_uint_minimum_required_token_balance)
        {
        std::cout << "Insufficient BZN token balance. Te balance of "
                  << s_uint_minimum_required_token_balance << "BZN required to run node. Your balance is "
                  << balance << "BZN" << std::endl;
        return 1;
        }

    std::cout << "Running node: " << options.get_address() << std::endl
              << "     on port: " << options.get_port() << std::endl
              << " config path: " << options.get_config() << std::endl;

    std::shared_ptr<Listener> listener;
    boost::thread websocket_thread(WebSocketServer("127.0.0.1", port, listener, 1));

    std::cout << "Press any key to stop" << std::endl;
    getchar();
    std::cout << "Stopping..." << std::endl;

    return 0;
}