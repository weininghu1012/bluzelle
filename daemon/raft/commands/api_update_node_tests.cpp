#include "ApiUpdateNodeCommand.h"
#include "DaemonInfo.h"

#include <boost/test/unit_test.hpp>

using namespace std;

struct F
{
    F() = default;

    ~F() = default;
};


BOOST_FIXTURE_TEST_SUITE(api_update_node_suite, F)

    // {
    //  "cmd":"updateNodes",
    //  "data":
    //      {
    //          "address":"127.0.0.1",
    //          "ip":"127.0.0.1",
    //          "port":8102,
    //          "available":100,
    //          "used":68,
    //          "isLeader":false,
    //          "alive":true
    //      }
    // }

    BOOST_AUTO_TEST_CASE(api_test_api)
    {
        try
            {
            DaemonInfo& info = DaemonInfo::get_instance();
            info.host_ip() = "127.0.0.1";
            info.host_port() = 8102;
            ApiUpdateNodeCommand sut;

            boost::property_tree::ptree response = sut();

            BOOST_CHECK_EQUAL( "updateNode", response.get<string>("cmd"));

            BOOST_CHECK_EQUAL( "127.0.0.1", response.get<string>("data.address"));

            BOOST_CHECK_EQUAL( "127.0.0.1", response.get<string>("data.ip"));

            BOOST_CHECK_EQUAL( "8102", response.get<string>("data.port"));

            BOOST_CHECK_EQUAL( "0", response.get<string>("data.available"));

            BOOST_CHECK_EQUAL( "0", response.get<string>("data.used"));

            BOOST_CHECK_EQUAL( "false", response.get<string>("data.isLeader"));

            BOOST_CHECK_EQUAL( "true", response.get<string>("data.alive"));
            }
        catch (const exception& e)
            {
            cerr << "e.what():[" << e.what() << "]\n";
            }
    }

BOOST_AUTO_TEST_SUITE_END()
