#include "RaftHeartbeatCommand.h"
#include "JsonTools.h"


RaftHeartbeatCommand::RaftHeartbeatCommand(RaftState& s) : state_(s)
{

}

boost::property_tree::ptree RaftHeartbeatCommand::operator()()
{
    boost::property_tree::ptree result;

    std::cout << " ♥" << std::endl;

    // if heartbeat received in candidate state transition to Follower.
    //state_.set_next_state_follower();

    // If heartbet received in Follower state -> re-arm timeout timer.
    //state_.rearm_timer();

    return result;
}
