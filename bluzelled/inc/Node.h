#ifndef KEPLER_NODE_H
#define KEPLER_NODE_H

#include "Task.h"
#include <boost/thread.hpp>
#include <boost/shared_ptr.hpp>

class Node
{
    // {"address":"0x00","nodeState":"alive","messages":20}
    std::string                         _name;
    boost::shared_ptr<Task>             _task;
    boost::shared_ptr<boost::thread>    _thread;
public:
    Node(uint32_t lifespan = 20, double death_probablity = 0.05)
    {
        auto thread_function = []
                (
                        Task *task
                )
            {
            task->run();
            };

        _task.reset(new Task(lifespan,death_probablity));
        _thread.reset(new boost::thread
                (
                        thread_function,
                        _task.get()
                ));

        _name = boost::lexical_cast<std::string>(get_thread_id());
    }

    boost::thread::id get_thread_id()
    {
        return _thread->get_id();
    }

    void kill()
    {
        _task->kill();
    }

    void join()
    {
        _thread->join();
    }

    Task::State state()
    {
        return _task->state();
    }

    std::string name()
    {
        return _name;
    }

    bool is_joinable()
    {
        return _thread->joinable();
    }

    void ping(boost::thread::id other)
    {
        _task->ping(other);
    }

    system_clock::time_point last_change()
    {
        return _task->get_last_change();
    }

private:

};

typedef std::vector<Node *> Nodes;

#endif //KEPLER_NODE_H
