#include "PeerList.h"

#include <string>
#include <fstream>
#include <boost/test/unit_test.hpp>
#include <boost/asio/io_service.hpp>
#include <boost/beast/core.hpp>


struct F
{
    F() = default;

    ~F() = default;
};

void write_temp_peer_file(const string& filename);


// --run_test=peerlist
BOOST_FIXTURE_TEST_SUITE(peerlist, F)

    BOOST_AUTO_TEST_CASE( test_read_local )
    {
        const auto local_peer_file = "/tmp/peers";
        write_temp_peer_file(local_peer_file);

        boost::asio::io_service ios;

        PeerList sut(ios, local_peer_file);

        BOOST_CHECK_EQUAL( "node_1", sut.peers()[0].name());
        BOOST_CHECK_EQUAL( "192.234.322.12", sut.peers()[0].host());
        BOOST_CHECK_EQUAL( 50000, sut.peers()[0].port());

        BOOST_CHECK_EQUAL( "node_2", sut.peers()[1].name());
        BOOST_CHECK_EQUAL( "33.274.222.12", sut.peers()[1].host());
        BOOST_CHECK_EQUAL( 51000, sut.peers()[1].port());
    }

    BOOST_AUTO_TEST_CASE( test_read_remote )
    {
        // this test is a bit sketchy, I'm serving a file from dropbox
        //https://www.dropbox.com/s/3florzyurredq2q/peers.txt?dl=1
        //        fake_1:123.45.67.123:50000
        //        jenk:13.78.177.88:50001
        //        punkh:50.68.19.200:50002

        // also https://nofile.io/f/UKpASB8rXht/peers.txt


        const std::string peer_url{"https://www.dropbox.com/s/3florzyurredq2q/peers.txt?dl=1"};
        const std::string local_peer_file{"/tmp/peers"};

        write_temp_peer_file(local_peer_file);

        boost::asio::io_service ios;

        PeerList sut(ios, local_peer_file, peer_url);

//        BOOST_CHECK_EQUAL( "fake_1", sut.peers()[2].name());
//        BOOST_CHECK_EQUAL( "123.45.67.123", sut.peers()[2].host());
//        BOOST_CHECK_EQUAL( 50000, sut.peers()[2].port());


    }


BOOST_AUTO_TEST_SUITE_END()


void write_temp_peer_file(const string& filename)
{
    std::ofstream ofs(filename, std::ofstream::out);
    ofs << "node_1=192.234.322.12:50000\n";
    ofs << "node_2=33.274.222.12:51000\n";
    ofs.close();
}