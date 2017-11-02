#define BOOST_TEST_DYN_LINK
#define BOOST_USE_VALGRIND

#include "Node.h"
#include "NodeUtilities.h"

#include <vector>
#include <boost/test/unit_test.hpp>
#include <numeric>

Nodes* create_test_nodes(int n);
unsigned count_alive(const Nodes nodes);
unsigned count_dead(const Nodes nodes)
{
    return nodes.size() - count_alive(nodes);
}

//  --run_test=test_reaper
//BOOST_AUTO_TEST_CASE( test_reaper )
//{
//    const int TEST_NODE_COUNT = 3;
//    Nodes* nodes = create_test_nodes(TEST_NODE_COUNT);
//
//    BOOST_CHECK( TEST_NODE_COUNT == nodes->size() );
//    wait_for_all_nodes_to_start(*nodes);
//    reaper(nodes);
//    boost::this_thread::sleep_for(boost::chrono::milliseconds(100));
//    BOOST_CHECK( 3 == nodes->size() );
//
//    nodes->operator[](1)->kill();
//    boost::this_thread::sleep_for(boost::chrono::milliseconds(100));
//
//    BOOST_CHECK(2==count_alive(*nodes));
//
//    reaper(nodes);
//    boost::this_thread::sleep_for(boost::chrono::milliseconds(100));
//
//    BOOST_CHECK( 2 == nodes->size() );
//    BOOST_CHECK( 2 == count_alive(*nodes) );
//    boost::this_thread::sleep_for(boost::chrono::milliseconds(100));
//
//    for(auto n : *nodes)
//        {
//        n->kill();
//        }
//
//    BOOST_CHECK( 2 == nodes->size() );
//    BOOST_CHECK( 0 == count_alive(*nodes) );
//
//    reaper(nodes);
//    boost::this_thread::sleep_for(boost::chrono::milliseconds(500));
//
//    BOOST_CHECK_MESSAGE( 0 == nodes->size(), " nodes->size() is [" << nodes->size() << "].");
//
//    delete nodes;
//}

//BOOST_AUTO_TEST_CASE( test_reaper_large_population )
//{
//    srand(time(nullptr));
//    const int TEST_NODE_COUNT = 30;
//    Nodes* nodes = create_test_nodes(TEST_NODE_COUNT);
//    wait_for_all_nodes_to_start(*nodes);
//
//    BOOST_CHECK(TEST_NODE_COUNT == count_alive(*nodes));
//
//    // kill off a third
//    const int killed = TEST_NODE_COUNT/3;
//    std::set<int> indexes;
//    while(indexes.size()<killed)
//        {
//        indexes.emplace(rand() % TEST_NODE_COUNT);
//        }
//
//    for(auto index : indexes)
//        {
//        (*nodes)[index]->kill();
//        (*nodes)[index]->join();
//        }
//
//    BOOST_CHECK(TEST_NODE_COUNT - killed == count_alive(*nodes));
//    BOOST_CHECK(TEST_NODE_COUNT == (*nodes).size());
//
//    reaper(nodes);
//
//    BOOST_CHECK(TEST_NODE_COUNT - killed == count_alive(*nodes));
//    BOOST_CHECK(TEST_NODE_COUNT - killed == (*nodes).size());
//    for(auto n : *nodes)
//        {
//        n->kill();
//        n->join();
//        delete n;
//        }
//}

Nodes* create_test_nodes(int n)
{
    Nodes* nodes = new Nodes();
    for(int i = 0; i < n ; ++i)
        {
        nodes->emplace_back(new Node());
        }
    return nodes;
}

unsigned count_alive(const Nodes nodes)
{
    return std::accumulate(
            nodes.begin(),
            nodes.end(),
            0,
            [](auto p, auto node)
                {
                return p + ((Task::alive == node->state()) ? 1 : 0);
                }
    );
}
