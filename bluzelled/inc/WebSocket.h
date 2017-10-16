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
public:
    WebSocket(Nodes* nodes) : _nodes(nodes) {
        auto server = [this]()
        {
            uWS::Hub h;
            h.onMessage([this](uWS::WebSocket<uWS::SERVER>* ws, char *message, size_t length, uWS::OpCode opCode) {
                ws->send(this->node_list().c_str(), this->node_list().length(), opCode);
                });

            h.onHttpRequest([this](uWS::HttpResponse *res, uWS::HttpRequest req, char *data, size_t length, size_t remainingBytes) {
                std::stringstream ss;
                std::ifstream file;
                file.open("../index.html");
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
                });

//            h.onConnection([&h](uWS::WebSocket<uWS::SERVER> ws, uWS::HttpRequest req) {
//                // send this client all stored messages in one batch send
//                uWS::WebSocket<uWS::SERVER>::PreparedMessage *preparedMessageBatch = uWS::WebSocket<uWS::SERVER>::prepareMessageBatch(storedMessages, excludedMessages, uWS::TEXT, false);
//                ws.sendPrepared(preparedMessageBatch);
//                ws.finalizeMessage(preparedMessageBatch);
//
//                // broadcast number of clients connected to everyone
////                std::string tmp = "S " + std::to_string(++connections) + " " +  std::to_string(getKb());
////                h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
//                });





            if(h.listen(3000))
                {
                std::cout << "Listening to port 3000" << std::endl;
                }
            else
                {
                std::cerr << "Failed to listen to port" << std::endl;
                return -1;
                }

            h.run();
        };
        _thread = new boost::thread(server);
    };
};

#endif //KEPLER_WEBSOCKET_H
