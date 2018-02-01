#ifndef BLUZELLE_COMMANDPROCESSOR_H
#define BLUZELLE_COMMANDPROCESSOR_H

#include "NodeInfo.hpp"
#include "Storage.h"
#include "Command.hpp"
#include "ApiCommandQueue.h"
#include "RaftCandidateState.h"

#include <memory>

using namespace std;
namespace pt = boost::property_tree;

class CommandFactory
{
private:
    Storage &storage_; // Also can be accessed from RaftState.
    ApiCommandQueue &queue_;

    bool
    has_key(const pt::ptree &s,
            const string &k) const;

    unique_ptr<Command>
    make_command(
        const pt::ptree &pt,
        RaftState &st) const;

    unique_ptr<Command>
    make_raft_command(const pt::ptree &pt,
                      RaftState &st) const;

    unique_ptr<Command>
    make_crud_command(const boost::property_tree::ptree &s,
                      RaftState &st) const;

    unique_ptr<Command>
    make_api_command(const boost::property_tree::ptree &s,
                     RaftState &st) const;

    std::pair<string, string>
    get_data(const boost::property_tree::ptree &pt) const;

public:

    CommandFactory
        (
            Storage &st,
            ApiCommandQueue &queue
        );

    unique_ptr<Command>
    get_command
        (
            const pt::ptree &pt,
            RaftState &st
        ) const;
};

#endif //BLUZELLE_COMMANDPROCESSOR_H
