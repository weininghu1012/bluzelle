#include "URL.h"

#include <boost/test/unit_test.hpp>

const std::string k_test_url = "https://www.something.com:8081/path/to/thing.txt?param1=yes&param2=no";
const std::string k_test_default_http_url = "www.something.com/path/to/thing.txt?param1=yes&param2=no";

struct F
{
    F() = default;

    ~F() = default;
};


// --run_test=url_test_suite
BOOST_FIXTURE_TEST_SUITE(url_test_suite, F)

    BOOST_AUTO_TEST_CASE( test_instantiate )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL(k_test_url, sut());
    }

    BOOST_AUTO_TEST_CASE( test_scheme )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL("https", sut.get_scheme());
    }

    BOOST_AUTO_TEST_CASE( test_host )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL("www.something.com", sut.get_host());
    }

    BOOST_AUTO_TEST_CASE( test_port )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL( 8081, sut.get_port());
    }

    BOOST_AUTO_TEST_CASE( test_target )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL( "/path/to/thing.txt?param1=yes&param2=no", sut.get_target());
    }

    BOOST_AUTO_TEST_CASE( test_functor )
    {
        URL sut(k_test_url);
        BOOST_CHECK_EQUAL( k_test_url, sut());
    }

    BOOST_AUTO_TEST_CASE( test_default_http )
    {
        URL sut(k_test_default_http_url); // scheme and port missing. So, we assume http and 80.
        BOOST_CHECK_EQUAL("http", sut.get_scheme());
        BOOST_CHECK_EQUAL( 80, sut.get_port());
        BOOST_CHECK_EQUAL( "/path/to/thing.txt?param1=yes&param2=no", sut.get_target());
    }

    BOOST_AUTO_TEST_CASE( test_default_functor )
    {
        URL sut(k_test_default_http_url);
        BOOST_CHECK_EQUAL( "http://www.something.com:80/path/to/thing.txt?param1=yes&param2=no", sut());
    }
BOOST_AUTO_TEST_SUITE_END()
