#include "CommandFactory.h"
#include "RaftHeartbeatCommand.h"
#include "CrudCreateCommand.h"
#include "CrudReadCommand.h"
#include "ApiCreateCommand.h"
#include "ApiReadCommand.h"
#include "RaftVoteCommand.h"
#include "RaftCountVotesCommand.h"
#include "PingCommand.h"
#include "ApiUpdateNodeCommand.h"
#include "JsonTools.h"


#include <typeinfo>
#include <cassert>
#include <memory>
using namespace std;




CommandFactory::CommandFactory
    (
        Storage& st,
        ApiCommandQueue& q
    )
    : storage_(st), queue_(q)
{
}

pair<string,string>
CommandFactory::get_data
    (
        const boost::property_tree::ptree& pt
    ) const
{
    auto data  = pt.get_child("data.");

    string key = ( data.count("key") > 0 ? data.get<string>("key") : "" );

    string val = ( data.count("value") > 0 ? data.get<string>("value") : "");

    return make_pair<string,string>(std::move(key), std::move(val));
}

unique_ptr<Command>
CommandFactory::get_command
    (
        const boost::property_tree::ptree& pt,
        RaftState& st
    ) const
{
    if (has_key(pt, "bzn-api"))
        {
        return make_api_command(pt, st);
        }

    if (has_key(pt, "crud"))
        {
        return make_crud_command(pt, st);
        }

    if (has_key(pt, "raft"))
        {
        return make_raft_command(pt, st);
        }

    if (has_key(pt, "cmd"))
        {
        return make_command(pt, st);
        }
    return nullptr;
}

bool
CommandFactory::has_key
    (
    const boost::property_tree::ptree& pt, const string& k
) const
{
    return pt.find(k) != pt.not_found();
}

unique_ptr<Command>
CommandFactory::make_raft_command
    (
        const boost::property_tree::ptree& pt,
        RaftState& st
    ) const
{
    const string raft_command_string = pt.get<string>("raft");
    try
        {
        static map<string,function< unique_ptr<Command>(const boost::property_tree::ptree& pt, RaftState&)> > handlers
            {
                {
                    "request-vote",
                    [](const boost::property_tree::ptree& pt, RaftState& st) -> unique_ptr<Command>
                    {
                        return std::make_unique<RaftVoteCommand>(st);
                    }
                },
                {
                    "vote",
                    [](const boost::property_tree::ptree& pt, RaftState& st) -> unique_ptr<Command>
                    {
                        string type_name = typeid(st).name();
                        assert( type_name.find("RaftState") == string::npos );

                        auto data  = pt.get_child("data.");
                        bool voted_yes = data.get<string>("voted") == "yes" ? true : false;
                        return std::make_unique<RaftCountVotesCommand>(st, voted_yes);
                    }
                },
                {
                    "beep",
                    [](const boost::property_tree::ptree& pt, RaftState& st) -> unique_ptr<Command>
                    {
                        return std::make_unique<RaftHeartbeatCommand>(st);
                    }
                }
            };
        return handlers.at(raft_command_string).operator()(pt, st);
        }
    catch (const exception &e)
        {
        cerr << "make_raft_command exception: [" << e.what() << "]. Command: [" << raft_command_string <<"]" << endl;
        }
    return nullptr;
}

unique_ptr<Command>
CommandFactory::make_crud_command
    (
    const boost::property_tree::ptree& pt,
    RaftState& st
    ) const
{
    std::cerr << "RaftState " << &st << " is unused in make_crud_command.\n";
    auto cmd = pt.get<string>("crud");
    auto dat = get_data(pt);

    if (cmd == "create")
        return std::make_unique<CrudCreateCommand>(storage_, dat.first, dat.second);

    if (cmd == "read")
        return std::make_unique<CrudReadCommand>(storage_, dat.first);

    return nullptr;
}

unique_ptr<Command>
CommandFactory::make_api_command
    (
    const boost::property_tree::ptree& pt,
    RaftState& st
    ) const
{
    std::cerr << "RaftState " << &st << " is unused in make_api_command.\n";
    auto cmd = pt.get<string>("bzn-api");
    auto dat = get_data(pt);

    // TODO: replace with the strategy pattern
    if (cmd == "create")
        return std::make_unique<ApiCreateCommand>(queue_, storage_, pt);

    if (cmd == "read")
        return std::make_unique<ApiReadCommand>(queue_, storage_, pt);

    return nullptr;
}

unique_ptr<Command>
CommandFactory::make_command
    (
    const bpt::ptree& pt,
    RaftState& st
    ) const
{
    auto cmd = pt.get<string>("cmd");
    try
        {
        static std::map<std::string, std::function<unique_ptr<Command>(RaftState& st)>> commands
            {
                {
                    "ping",
                    [](RaftState& st)
                    {
                        return std::make_unique<PingCommand>();
                    }
                } ,
                {
                    "updateNode",
                    [](RaftState& st)
                    {
                        return std::make_unique<ApiUpdateNodeCommand>();
                    }
                }
            };

        return commands.at(cmd)(st);
        }
    catch(const exception& e)
        {
        cerr << "make_command caught exception: [" << e.what() << "]\n";
        }
    return nullptr;
}