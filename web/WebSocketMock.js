module.exports = SocketBase => class Socket extends SocketBase {
    wsOptions() {
        return {path: '/ws'}
    }

    websocket(wss) {
        wss.on('connection', (ws, req) => {

            ws.on('message', req => {
                req = JSON.parse(req);
                ws.send(
                    JSON.stringify(
                        Object.assign(
                            commandProcessors[req.cmd](req.data),
                            {seq: req.seq}
                        )
                    )
                );
            })
        })
    }
};

const commandProcessors = {
    getAllNodes: () => ({
        cmd: 'addNodes',
        data: [{address: '0x01', nodeState: 'alive'}, {address: '0x02', nodeState: 'dead'}, {address: '0x03', nodeState: 'new'}]
    })
};