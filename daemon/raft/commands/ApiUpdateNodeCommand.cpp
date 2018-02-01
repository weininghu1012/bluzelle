#include "ApiUpdateNodeCommand.h"
#include "node/DaemonInfo.h"

ApiUpdateNodeCommand::ApiUpdateNodeCommand( )
{}


boost::property_tree::ptree
ApiUpdateNodeCommand::operator()()
{
    boost::property_tree::ptree pt;
    DaemonInfo& info = DaemonInfo::get_instance();
    pt.put("cmd", "updateNode");
    pt.put("data.address", info.host_ip());
    pt.put("data.ip", info.host_ip());
    pt.put("data.port", info.host_port());
    pt.put("data.available", 0);
    pt.put("data.used", 0);
    pt.put("data.isLeader", false);
    pt.put("data.alive", true);
    return pt;
}

