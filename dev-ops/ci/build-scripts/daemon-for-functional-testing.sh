#!/usr/bin/env bash
PID=`ps ax |grep 'Daemon_For_Functional_Testing/client/web/node_modules' | cut -d' ' -f1`
echo "**** PID ***** $PID"
if [ $PID ]; then
    kill -9 $PID || true
fi

cd $WORKSPACE/client/web
yarn
cd $WORKSPACE/client/web/src
webpack
cd $WORKSPACE/client/web

/usr/local/sbin/daemonize -c $WORKSPACE/client/web -e $WORKSPACE/daemon-error -o $WORKSPACE/daemon-stdout -p $WORKSPACE/pid -E BUILD_ID=dontKillMe `which yarn` start

