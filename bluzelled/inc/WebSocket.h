#ifndef KEPLER_WEBSOCKET_H
#define KEPLER_WEBSOCKET_H

#include "Node.h"

//#include <uWS/uWS.h>
#include <boost/thread.hpp>
#include <boost/algorithm/string/join.hpp>
#include <sstream>
#include <fstream>
#include <iostream>

// {
//  cmds:
//  [
//      {cmd: 'addNode', data:{address: '0xffff', status: 'alive'}}
//  ]
// }

class WebSocket {
    Nodes*          _nodes;
    boost::thread*  _thread;

    std::string  node_list();

//    void on_message(
//            uWS::WebSocket<uWS::SERVER>* ws,
//            char *message,
//            size_t length,
//            uWS::OpCode opCode);
//
//    void on_http_request(
//            uWS::HttpResponse *res,
//            uWS::HttpRequest req,
//            char *data,
//            size_t length,
//            size_t remainingBytes);

public:
    WebSocket(Nodes* nodes);
};

#endif //KEPLER_WEBSOCKET_H
