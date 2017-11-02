#ifndef KEPLER_TASK_H
#define KEPLER_TASK_H

#include "CSet.h"
#include <sstream>
#include <boost/thread.hpp>
#include <boost/format.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/chrono.hpp>
#include <iostream>


using namespace boost::chrono;

#define RAND() ((double)rand() / RAND_MAX )


class Task
{
public:
    enum  State { initializing, alive, dying, dead};

private:
    thread_clock::time_point    _birth;
    State                       _state;
    CSet<boost::thread::id>*    _friends;
    system_clock::time_point    _state_changed;

public:
    ~Task()
    {
        if(_friends != nullptr)
            {
            _friends->clear();
            delete _friends;
            _friends = nullptr;
            }
    }

    void run()
    {
        setup();
        life();
        death();
    }

    void operator()()
    {
        run();
    }

    void ping(const boost::thread::id& src_id)
    {
        (void)src_id;

//        std::stringstream s;
//        s << "[" << get_id() << "]" << src_id << " pinged me!\n";
//        boost::this_thread::yield();
//        print_message(s.str().c_str());
//
//        if(_friends && _friends->end() != _friends->find(src_id))
//            {
//            s.str("");
//            s << "we're already friends!\n";
//            }
//        else
//            {
//            Task* t = find_task(src_id);
//            if (nullptr != t)
//                {
//                s.str("");
//                s << "I've made a new friend! Pinging back!\n";
//                _friends->insert(src_id);
//                t->ping(get_id());
//                }
//            else
//                {
//                s << "Friend not found!\n";
//                }
//            }
//
//        print_message(s.str().c_str());
    }

    State state()
    {
        return _state;
    }

    void kill()
    {
        _state=dying;
    }

    system_clock::time_point get_last_change()
    {
        return _state_changed;
    }

    unsigned long friendCount() { return _friends != nullptr ? _friends->size() : 0 ;}

private:
    void setup()
    {
        _birth = thread_clock::now();
        _state_changed = system_clock::now();
        srand(time(0));
        _state = initializing;
        _friends = new CSet<boost::thread::id>();
    }

    void life()
    {
        _state_changed = system_clock::now();
        _state = alive;
        while( state() == alive ) {
            thread_clock::duration age = thread_clock::now().time_since_epoch() - _birth.time_since_epoch();
            if (age > boost::chrono::seconds(20)) {
                if (RAND() < 0.25) {
                    _state = Task::dying;
                }
            }
        }
    }

    void death()
    {
        _state = dead;
        _state_changed = system_clock::now();
        std::cout << "task dead" << std::endl;
    }

    //
    void interact()
    {
//        _friends.iterate(
//                [
//                        this
//                ](
//                        boost::thread::id i
//                )
//                    {
//
//
//                    }
//        );
    }
};


#endif //KEPLER_TASK_H
