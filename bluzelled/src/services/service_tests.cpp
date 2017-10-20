#define BOOST_TEST_DYN_LINK
#define BOOST_USE_VALGRIND

#include "services/Services.h"
#include "services/Ping.h"

#include <sstream>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <boost/test/unit_test.hpp>

namespace pt = boost::property_tree;

class TestService : public Service
{
public:
    std::string operator()(const std::string& json_string) override
    {
        return json_string;
    }
};

// --run_test=test_service
BOOST_AUTO_TEST_CASE( test_service )
{
    TestService sut;
    BOOST_CHECK(0 == sut("{\"test\":1}").compare("{\"test\":1}"));
}

// --run_test=test_service
BOOST_AUTO_TEST_CASE( test_services )
{
    std::string json_string("{\"test\":1}");
    Services sut;
    sut.add_service("test", new TestService());
    auto result = sut( "test", json_string);
    BOOST_CHECK(0 == json_string.compare(result));
}

// --run_test=test_ping_service
BOOST_AUTO_TEST_CASE( test_ping_service )
{
    Ping sut;
    std::string json_request("{\"cmd\":\"ping\",\"seq\":18364}");
    std::stringstream ss;
    ss << "{\"cmd\":\"pong\",\"seq\":18364}";
    pt::ptree tree;
    pt::read_json(ss, tree);
    ss.str("");
    pt::write_json(ss,tree);

    BOOST_CHECK(0 == sut(json_request).compare(ss.str()));
}


