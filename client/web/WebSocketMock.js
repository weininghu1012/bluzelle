const _ = require('lodash');

const DELAY = 500;
let socket;

module.exports = SocketBase => class Socket extends SocketBase {

    websocket(wss) {
        wss.on('connection', (ws, req) => {
            socket = ws;

            ws.on('message', req => {
                req = JSON.parse(req);
                setTimeout(() => {
                    commandProcessors[req.cmd](req.data).forEach(cmd => {
                        ws.send(
                            JSON.stringify(
                                Object.assign(
                                    cmd, {seq: req.seq}
                                )
                            )
                        )
                    })
                }, DELAY);
            })

            ws.on('close', () => {
                socket = undefined;
            })
        })
    }
};

let nodes = [];
let baseAddress = 0

const createNodes = num => nodes = _.times(num, () => ({
    address: `0x${_.padStart((baseAddress++).toString(16), 2, '0')}`,
    nodeState: ['alive', 'dead', 'new'][baseAddress % 3],
    messages: 20
}));

createNodes(10);

const sendMessages = () => {
    const updatedNodes = _.times(10, () => {
        const idx = Math.floor(Math.random() * 10);
        nodes[idx].messages += 1
        return nodes[idx];
    });
    socket && socket.send(JSON.stringify({
        cmd: 'updateNodes', data: updatedNodes
    }))

};

setInterval(sendMessages, 1000);


const commandProcessors = {
    getAllNodes: () => ([{
        cmd: 'updateNodes',
        data: nodes
    }]),
    getMaxNodes: () => ([{
        cmd: 'setMaxNodes',
        data: nodes.length
    }]),
    setMaxNodes: (num) => {
        const cmds = [];

        cmds.push({cmd: 'setMaxNodes', data: num});

        const nodesToRemove = nodes.map(n => n.address);
        nodesToRemove && cmds.push({cmd: 'removeNodes', data: nodesToRemove});

        nodes = [];

        cmds.push({cmd: 'updateNodes', data: createNodes(num)});

        return cmds;
    }
};