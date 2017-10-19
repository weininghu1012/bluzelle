#include "WebSocket.h"


//#include <boost/beast/core.hpp>
//#include <boost/beast/websocket.hpp>
//#include <boost/asio/strand.hpp>
//#include <boost/asio/ip/tcp.hpp>
//#include <algorithm>
//#include <cstdlib>
//#include <functional>
//#include <iostream>
//#include <memory>
//#include <string>
//#include <thread>
//#include <vector>

using tcp = boost::asio::ip::tcp;               // from <boost/asio/ip/tcp.hpp>
namespace websocket = boost::beast::websocket;  // from <boost/beast/websocket.hpp>

//------------------------------------------------------------------------------

// Report a failure
void
fail(boost::system::error_code ec, char const* what)
{
    std::cerr << what << ": " << ec.message() << "\n";
}


