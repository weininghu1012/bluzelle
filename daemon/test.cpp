#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MODULE "BaseClassModule"
#include <boost/test/unit_test.hpp>

#include <iostream>
#include <string>
using namespace std;

#include <boost/tokenizer.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/algorithm/string.hpp>
#include <boost/algorithm/string/trim_all.hpp>
#include <boost/bimap.hpp>
#include <boost/units/unit.hpp>
#include <boost/units/systems/si.hpp>
#include <boost/units/systems/si/prefixes.hpp>
using namespace boost;
using namespace boost::algorithm;
using namespace boost::units;
using namespace boost::units::si;

#include <fstream>
#include <experimental/filesystem>
namespace fs = std::experimental::filesystem;

struct F
{
    F() = default;

    ~F() = default;
};


BOOST_FIXTURE_TEST_SUITE(base_suite, F)
    /*BOOST_AUTO_TEST_CASE(first)
    {
        BOOST_CHECK(false);
    }

    BOOST_AUTO_TEST_CASE(second)
    {
        string cs0( "" );
        BOOST_CHECK_EQUAL( cs0.length(), (size_t)0 );
        BOOST_CHECK( cs0.empty());
    }

    BOOST_AUTO_TEST_CASE(third)
    {
        string cs01( "hello" );
        BOOST_CHECK_EQUAL( cs01.length(), (size_t)5 );
        BOOST_CHECK( cs01.empty() );
    }

    BOOST_AUTO_TEST_CASE(fourth)
    {
        string cs_array[] = { "str1", "str2" };
        BOOST_CHECK_EQUAL( cs_array[0], "str1" );
        BOOST_CHECK_EQUAL( cs_array[1], "str2" );
    }

    BOOST_AUTO_TEST_CASE(fifth)
    {
        const fs::path& symPath = "./confix.txt";
        BOOST_CHECK(fs::exists(symPath) );
    }

    BOOST_AUTO_TEST_CASE(sixth)
    {
        const fs::path symPath = "./confix.txt";
        std::ofstream out(symPath.string());
        BOOST_CHECK(!fs::exists(symPath) );
    }*/
    // don't use test.cpp, in config parser
    BOOST_AUTO_TEST_CASE(readfile)
    {
        const fs::path symPath = "/home/qamar/confix.txt";
        // won't recognize ~
        std::ifstream in(symPath.string());
        string line1, line2;

        //getline(in,line);

        in >> line1 >> line2;
        cout << line1 << "\n" << line2;

        BOOST_CHECK(line2.length());
    }

    BOOST_AUTO_TEST_CASE(eighth)
    {
        // make first line
        fstream myFileHandler;
        string line;
        //myFileHandler.open("/home/qamar/confix.txt");
        //myFileHandler << "this is a sample text";
        //myFileHandler.close();
    }

BOOST_AUTO_TEST_SUITE_END()