#ifndef BLUZELLE_COMMANDPROCESSOR_H
#define BLUZELLE_COMMANDPROCESSOR_H

#include "NodeInfo.hpp"
#include "Storage.h"
#include "Command.hpp"
#include "ApiCommandQueue.h"
#include "RaftCandidateState.h"

#include <memory>

using std::unique_ptr;

class CommandFactory {
private:
    Storage& storage_;
    ApiCommandQueue& queue_;

    bool is_raft(const boost::property_tree::ptree& s) const;
    bool is_crud(const boost::property_tree::ptree& s) const;
    bool is_api(const boost::property_tree::ptree& s) const;

    unique_ptr<Command> make_raft_command(const boost::property_tree::ptree& s) const;
    unique_ptr<Command> make_crud_command(const boost::property_tree::ptree& s) const;
    unique_ptr<Command> make_api_command(const boost::property_tree::ptree& s) const;

    std::pair<string,string> get_data(const boost::property_tree::ptree& pt) const;

public:
    CommandFactory(Storage& st,
            ApiCommandQueue& queue);

    // [todo] Instead of generic get_command have get_leader_command(), get_follower_command & get_candidate_command()
    // So only command that can be executed in certain state is created.
    unique_ptr<Command>
    get_command(const boost::property_tree::ptree& pt) const;

    unique_ptr<Command>
    get_candidate_command(const boost::property_tree::ptree& pt, RaftCandidateState& st) const;
};

#endif //BLUZELLE_COMMANDPROCESSOR_H
