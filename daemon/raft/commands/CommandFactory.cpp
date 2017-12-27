#include "CommandFactory.h"

#include "RaftHeartbeatCommand.h"
#include "CrudCreateCommand.h"
#include "CrudReadCommand.h"
#include "ApiCreateCommand.h"
#include "ApiReadCommand.h"
#include "ErrorCommand.hpp"
#include "RaftVoteCommand.h"
#include "RaftCountVotesCommand.h"


CommandFactory::CommandFactory(Storage& st, ApiCommandQueue& q)
    : storage_(st), queue_(q) {

}

// This is a heartbeat command.
bool CommandFactory::is_raft(const boost::property_tree::ptree& pt) const {
    return pt.find("raft") != pt.not_found();
}

// CRUD commands go from leader to followers. I.e they are log replication commands.
bool CommandFactory::is_crud(const boost::property_tree::ptree& pt) const {
    return pt.find("crud") != pt.not_found();
}

// API commands go from API to leader. Same format as CRUD.
bool CommandFactory::is_api(const boost::property_tree::ptree& pt) const {
    return pt.find("bzn-api") != pt.not_found();
}

unique_ptr<Command> CommandFactory::make_raft_command(const boost::property_tree::ptree& pt) const {
    auto cmd = pt.get<string>("raft");
    if (cmd == "beep")
        return std::make_unique<RaftHeartbeatCommand>();

    return nullptr;
}

unique_ptr<Command>
CommandFactory::make_crud_command(const boost::property_tree::ptree& pt) const {
    auto cmd = pt.get<string>("crud");
    auto dat = get_data(pt);

    if (cmd == "create")
        return std::make_unique<CrudCreateCommand>(storage_, dat.first, dat.second);

    if (cmd == "read")
        return std::make_unique<CrudReadCommand>(storage_, dat.first);

    return nullptr;
}

unique_ptr<Command>
CommandFactory::make_api_command(const boost::property_tree::ptree& pt) const {
    auto cmd = pt.get<string>("bzn-api");
    auto dat = get_data(pt);

    if (cmd == "create")
        return std::make_unique<ApiCreateCommand>(queue_, storage_, pt);

    if (cmd == "read")
        return std::make_unique<ApiReadCommand>(queue_, storage_, pt);

    return nullptr;
}

std::pair<string,string>
CommandFactory::get_data(const boost::property_tree::ptree& pt) const {
    auto data  = pt.get_child("data.");

    string key;
    if (data.count("key") > 0)
        key = data.get<string>("key");

    string val;
    if (data.count("value") > 0)
        val = data.get<string>("value");

    return std::make_pair<string,string>(std::move(key), std::move(val));
}

unique_ptr<Command>
CommandFactory::get_command(const boost::property_tree::ptree& pt) const {
    if (is_raft(pt))
        return make_raft_command(pt);

    if (is_crud(pt))
        return make_crud_command(pt);

    if (is_api(pt))
        return make_api_command(pt);

    return std::make_unique<ErrorCommand>("Unsupported command");
}

unique_ptr<Command>
CommandFactory::get_candidate_command(const boost::property_tree::ptree& pt,
                      RaftCandidateState& st) const
{
    if (!is_raft(pt))
        return nullptr;

    auto cmd = pt.get<string>("raft");
    if (cmd == "request-vote")
        return std::make_unique<RaftVoteCommand>(st);

    if (cmd == "vote")
        {
        auto data  = pt.get_child("data.");
        bool voted_yes = data.get<string>("voted") == "yes" ? true : false;
        return std::make_unique<RaftCountVotesCommand>(st, voted_yes);
        }

    return std::make_unique<ErrorCommand>("Unsupported command");
}
