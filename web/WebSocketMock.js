const _ = require('lodash')

module.exports = SocketBase => class Socket extends SocketBase {

    websocket(wss) {
        wss.on('connection', (ws, req) => {

            ws.on('message', req => {
                req = JSON.parse(req);
                commandProcessors[req.cmd](req.data).forEach(cmd => {
                    ws.send(
                        JSON.stringify(
                            Object.assign(
                                cmd, {seq: req.seq}
                            )
                        )
                    )
                });
            })
        })
    }
};

let nodes = [];

const createNodes = num => nodes = _.range(num).map((n, idx) => ({
    address: `0x${_.padStart((n).toString(16), 2, '0')}`,
    nodeState: ['alive', 'dead', 'new'][idx % 3],
    messages: 20
}));

const commandProcessors = {
    getAllNodes: () => ([{
        cmd: 'updateNodes',
        data: createNodes(10)
    }]),
    getMaxNodes: () => ([{
        cmd: 'setMaxNodes',
        data: nodes.length
    }]),
    setMaxNodes: (num) => {
        const cmds = [];

        const nodesToRemove = nodes.slice(num).map(n => n.address);
        nodesToRemove && cmds.push({cmd: 'removeNodes', data: nodesToRemove});

        cmds.push({cmd: 'updateNodes', data: createNodes(num)});

        return cmds;
    }
};