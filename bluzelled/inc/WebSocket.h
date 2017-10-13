#ifndef KEPLER_WEBSOCKET_H
#define KEPLER_WEBSOCKET_H

#include "Node.h"

#include <uWS/uWS.h>
#include <boost/thread.hpp>
#include <boost/algorithm/string/join.hpp>
#include <sstream>

// {cmds:[{cmd: 'addNode', data:{address: '0xffff', status: 'alive'}}]}

class WebSocket {
    Nodes*          _nodes;
    boost::thread*  _thread;

public:
    WebSocket(Nodes* nodes) : _nodes(nodes) {
        auto server = [this]()
        {
            uWS::Hub h;
            h.onMessage([](uWS::WebSocket<uWS::SERVER>* ws, char *message, size_t length, uWS::OpCode opCode) {
                ws->send(message, length, opCode);
                });

            h.onHttpRequest([this](uWS::HttpResponse *res, uWS::HttpRequest req, char *data, size_t length, size_t remainingBytes) {
                std::stringstream ss;
                ss << "[";
               for(auto n : *this->_nodes)
                   {
                   ss << "\"" << n->get_thread_id() << "\",";
                   }
                ss.seekp(-1, ss.cur);
                ss << "]\n";
                res->end(ss.str().c_str(), ss.str().length());
                });


            h.listen(3000);
            h.run();
        };
        _thread = new boost::thread(server);
    };
    ~WebSocket()
    {
//        _thread->join();
//        delete _thread;
//        _nodes = nullptr;
    };


};

#endif //KEPLER_WEBSOCKET_H
