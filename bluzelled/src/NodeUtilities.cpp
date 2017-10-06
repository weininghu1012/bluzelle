#include "NodeUtilities.h"

#include <algorithm>
#include <iostream>

bool all_nodes_alive(const Nodes& nodes)
{
    for(auto node : nodes)
        {
        if(node->state() != Task::alive)
            {
            return false;
            }
        }
    return !nodes.empty();
}

void wait_for_all_nodes_to_start(const Nodes &nodes)
{
    while (!all_nodes_alive(nodes))
        {
        boost::this_thread::sleep(boost::posix_time::milliseconds(100));
        }
}

void join_dead_tasks(Nodes *nodes)
{
    for(auto n : *nodes )
        {
        if(n->state() == Task::dead)
            {
            n->join();
            }
        }
}

void remove_dead_nodes(Nodes *nodes)
{
    auto is_task_dead = [](auto n) {return (n->state() == Task::dead);};
    auto r = std::remove_if
            (
                    nodes->begin(),
                    nodes->end(),
                    is_task_dead
            );
    if(r != nodes->end())
        {
        nodes->erase(r,nodes->end());
        }
}


void reaper(Nodes *nodes)
{
    join_dead_tasks(nodes);
    remove_dead_nodes(nodes);
}
