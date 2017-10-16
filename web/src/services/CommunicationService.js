let socket;
let seq = 0;
let commandProcessors = [];

autorun(() =>
    Session.get('ready') && startSocket()
);

const startSocket = () => {
    socket = new WebSocket(`ws://${window.location.host}/ws`);
    socket.onopen = () => Session.set('websocket.ready', true);
    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        commandProcessors[msg.cmd](msg.data);
    }
};

export const sendCommand = (cmd, data) => {
    socket.send(JSON.stringify({cmd: cmd, data: data, seq: seq++}));
};

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

