#ifndef KEPLER_NODE_H
#define KEPLER_NODE_H

#include "Task.h"
#include <boost/thread.hpp>
#include <boost/shared_ptr.hpp>

class Node
{
    boost::shared_ptr<Task>             _task;
    boost::shared_ptr<boost::thread>    _thread;
public:
    Node()
    {
        auto thread_function = []
                (
                        Task *task
                )
            {
            task->run();
            };

        _task.reset(new Task());
        _thread.reset(new boost::thread
                (
                        thread_function,
                        _task.get()
                ));
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

    bool is_joinable()
    {
        return _thread->joinable();
    }

    void ping(boost::thread::id other)
    {
        _task->ping(other);
    }


private:



};

typedef std::vector<Node *> Nodes;

#endif //KEPLER_NODE_H
