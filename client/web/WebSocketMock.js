const _ = require('lodash');

const DELAY = 500;
let sockets = [];
let nodes = [];
let maxNodes = 10;
let minNodes = 8;
let baseAddress = 0;


module.exports = SocketBase => class Socket extends SocketBase {

    websocket(wss) {
        wss.on('connection', (ws, req) => {
            sockets.push(ws);

            ws.on('message', req => {
                req = JSON.parse(req);
                setTimeout(() =>
                    commandProcessors[req.cmd](req.data)
                , DELAY);
            });

            ws.on('close', () => {
                _.remove(sockets, ws);
            })
        })
    }
};


const createNodes = () => {
    let i = 0;
    while(nodes.length < maxNodes) {
        const node = {
            address: `0x${_.padStart((baseAddress++).toString(16), 2, '0')}`,
            messages: 0
        };
        nodes.push(node);
        setTimeout(() => {
            sendToClients('updateNodes', [node]);
        },(i++) * 600)
    }
};

const sendToClients = (cmd, data) => sockets.forEach(socket => socket.send(JSON.stringify({cmd: cmd, data: data})));


const updateMessages = () => {
    if(nodes.length) {
        const updatedNodes = _.times(10, () => {
            const n = nodes[Math.floor(Math.random() * nodes.length)];
            n.messages += 1;
            return n;
        });

        sendToClients('updateNodes', updatedNodes);
    }
};

const sendLogMessage = () => {
    sendToClients('log', {
        timer_no: 1,
        entry_no: _.uniqueId(),
        timestamp: new Date().toISOString(),
        message: `message - ${_.uniqueId()}`
    });
};

const killANode = () => {
    if(nodes.length) {
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        _.remove(nodes, node);
        sendToClients('removeNodes', [node.address]);
    }
};


setInterval(updateMessages, 1000);
setInterval(sendLogMessage, 10000);
setInterval(killANode, 6137);
setInterval(createNodes, 10285);


const commandProcessors = {
    getAllNodes: () => sendToClients('updateNodes', nodes),
    getMaxNodes: () => sendToClients('setMaxNodes', nodes.length),
    setMaxNodes: (num) => {
        maxNodes = num;
        sendToClients('setMaxNodes', num);
    },
    setMinNodes: (num) => {
        minNodes = num;
        sendToClients('setMinNodes', num);
    }
};