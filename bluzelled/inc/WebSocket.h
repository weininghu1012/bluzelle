#ifndef KEPLER_WEBSOCKET_H
#define KEPLER_WEBSOCKET_H

#include "Node.h"

#include <uWS/uWS.h>
#include <boost/thread.hpp>
#include <boost/algorithm/string/join.hpp>
#include <sstream>
#include <fstream>

// {cmds:[{cmd: 'addNode', data:{address: '0xffff', status: 'alive'}}]}

class WebSocket {
    Nodes*          _nodes;
    boost::thread*  _thread;
    std::string  node_list();

    void on_message(uWS::WebSocket<uWS::SERVER>* ws, char *message, size_t length, uWS::OpCode opCode)
    {
        message[length] = 0;
        std::string response("");
        std::string command(message);
        // replace with stategty pattern
        if( 0 == command.compare("ping") )
            {
            response = "pong";
            }
        else if( 0 == command.compare("getAllNodes") )
            {
            response = this->node_list();
            }
        ws->send( response.c_str(), response.length(), opCode);
    }

    void on_http_request(
            uWS::HttpResponse *res,
            uWS::HttpRequest req,
            char *data,
            size_t length,
            size_t remainingBytes)
    {
        std::stringstream ss;
        std::ifstream file;
        file.open("../web/index.html");
        if(file.is_open())
            {
            std::string line;
            while(std::getline(file,line))
                {
                ss << line;
                }
            }
        else
            {
            std::cerr << "Unable to open index.html.\n";
            }
        res->end(ss.str().c_str(), ss.str().length());
    }

public:
    WebSocket(Nodes* nodes);
};

#endif //KEPLER_WEBSOCKET_H
