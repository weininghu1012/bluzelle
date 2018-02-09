#include "ConfigParser.h"

#include <sstream>
#include <boost/test/unit_test.hpp>


#include <boost/property_tree/ptree.hpp>

namespace bpt = boost::property_tree;

using namespace std;

namespace bpt = boost::property_tree;

struct F
{
    F() = default;

    ~F() = default;
};

BOOST_FIXTURE_TEST_SUITE(config, F)

    BOOST_AUTO_TEST_CASE( test_config_stream_parse )
    {
        stringstream config_stream;
        config_stream << "{";
        config_stream << R"("id":"3e38a584-0d31-11e8-ba89-0ed5f89f718b")";
        config_stream << "}";

        ConfigParser sut(config_stream);
        bpt::ptree config_tree{sut()};

        BOOST_CHECK_EQUAL(
            "3e38a584-0d31-11e8-ba89-0ed5f89f718b",
            config_tree.get<string>("id")
        );


        // daemon id uuid
        // port id,


        // parse file


        // retrieve from sut


    }

BOOST_AUTO_TEST_SUITE_END()
