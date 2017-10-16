#include "WebSocket.h"



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