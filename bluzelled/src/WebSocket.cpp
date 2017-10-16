#include "WebSocket.h"
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
WebSocket::WebSocket(Nodes *nodes) : _nodes(nodes)
{
    auto server = [this]()
        {
        uWS::Hub h;
        h.onMessage(
                [this](uWS::WebSocket<uWS::SERVER>* ws, char *message, size_t length, uWS::OpCode opCode)
                    {
                    this->on_message(ws, message, length, opCode);
                    });

        h.onHttpRequest(
                [this](uWS::HttpResponse *res, uWS::HttpRequest req, char *data, size_t length, size_t remainingBytes)
                    {
                    this->on_http_request(res, req, data, length, remainingBytes);
                    });

            h.onConnection([this](uWS::WebSocket<uWS::SERVER>* ws, uWS::HttpRequest req) {
                std::cout << "ws:[" << ws->remainingBytes << "]\n";
//                // send this client all stored messages in one batch send
//                uWS::WebSocket<uWS::SERVER>::PreparedMessage *preparedMessageBatch = uWS::WebSocket<uWS::SERVER>::prepareMessageBatch(storedMessages, excludedMessages, uWS::TEXT, false);
//                ws.sendPrepared(preparedMessageBatch);
//                ws.finalizeMessage(preparedMessageBatch);
//
//                // broadcast number of clients connected to everyone
//                std::string tmp = "S " + std::to_string(++connections) + " " +  std::to_string(getKb());
//                h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
                });

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
}

std::string WebSocket::node_list()
{
    std::stringstream ss;
    ss << "[";
    for(auto n : *this->_nodes)
        {
        ss << "\"" << n->get_thread_id() << "\",";
        }
    ss.seekp(-1, ss.cur);
    ss << "]\n";
    return ss.str();
}