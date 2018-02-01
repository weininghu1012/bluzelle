#ifndef BLUZELLE_APICOMMANDQUEUE_H
#define BLUZELLE_APICOMMANDQUEUE_H

#include <string>
#include <queue>
#include <utility>

using std::queue;
using std::pair;
using std::string;

// TODO rethink why this class can't just be replaced with a typedef.
class ApiCommandQueue
{
    queue<pair<string,string>> queue_;
public:
    void
    push(
        const pair<string,string>& p
    )
    {
        queue_.push(p);
    }

    void
    pop()
    {
        return queue_.pop();
    }

    bool
    empty()
    {
        return queue_.empty();
    }

    pair<string,string>&
    front()
    {
        return queue_.front();
    }
};

#endif //BLUZELLE_APICOMMANDQUEUE_H
