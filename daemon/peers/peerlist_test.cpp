#include "PeerList.h"

#include <string>
#include <fstream>
#include <iostream>
#include <boost/test/unit_test.hpp>
#include <boost/asio/io_service.hpp>
#include <boost/beast/core.hpp>
#include <boost/filesystem.hpp>


struct F
{
    F() = default;

    ~F() = default;
};

void write_temp_peer_file(const string& filename);
int start_local_peers_server();

const std::string klocal_peer_file{"/tmp/bluzelle/peers"};

// --run_test=peerlist
BOOST_FIXTURE_TEST_SUITE(peerlist, F)

    BOOST_AUTO_TEST_CASE( test_read_local )
    {
        write_temp_peer_file(klocal_peer_file);
        boost::asio::io_service ios;
        PeerList sut(ios, klocal_peer_file);

        BOOST_CHECK_EQUAL( "node_1", sut.peers()[0].name());
        BOOST_CHECK_EQUAL( "192.234.322.12", sut.peers()[0].host());
        BOOST_CHECK_EQUAL( 50000, sut.peers()[0].port());

        BOOST_CHECK_EQUAL( "node_2", sut.peers()[1].name());
        BOOST_CHECK_EQUAL( "33.274.222.12", sut.peers()[1].host());
        BOOST_CHECK_EQUAL( 51000, sut.peers()[1].port());
    }

    BOOST_AUTO_TEST_CASE( test_read_remote )
    {
        // this test is a bit sketchy, I'm serving a file from a local server
        //http://localhost:80/peers.txt
        //        fake_1:123.45.67.123:50000
        //        jenk:13.78.177.88:50001
        //        punkh:50.68.19.200:50002

        // also https://nofile.io/f/UKpASB8rXht/peers.txt

        start_local_peers_server();

        const std::string peer_url{"localhost:8080/peers.txt"};

        write_temp_peer_file(klocal_peer_file);
        boost::asio::io_service ios;

        PeerList sut(ios, klocal_peer_file, peer_url);

        BOOST_CHECK_EQUAL( "fake_1", sut.peers()[2].name());
        BOOST_CHECK_EQUAL( "123.45.67.123", sut.peers()[2].host());
        BOOST_CHECK_EQUAL( 50000, sut.peers()[2].port());

        BOOST_CHECK_EQUAL( "jenk", sut.peers()[3].name());
        BOOST_CHECK_EQUAL( "13.78.177.88", sut.peers()[3].host());
        BOOST_CHECK_EQUAL( 50001, sut.peers()[3].port());

    }


BOOST_AUTO_TEST_SUITE_END()

void write_temp_peer_file(const string& filename)
{
    boost::filesystem::path dir("/tmp/bluzelle");
    if(boost::filesystem::create_directories(dir))
        {
        std::ofstream ofs(filename, std::ofstream::out);
        ofs << "node_1=192.234.322.12:50000\n";
        ofs << "node_2=33.274.222.12:51000\n";
        ofs.close();
        }
}

int start_local_peers_server()
{
    int ret = std::system("cd /tmp/bluzelle");
    ret = std::system("http-server");

    std::cout << "ret: " << ret << std::endl;
    return ret;
}

