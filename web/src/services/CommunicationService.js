let socket;
let seq = 0;
let commandProcessors = [];

setTimeout(() => startSocket());


const startSocket = () => {
    socket = new WebSocket(`ws://${window.location.host}`);
    socket.onopen = () => socketReady.set(true);
    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        commandProcessors[msg.cmd](msg.data);
    }
};

export const socketReady = observable(false);

export const sendCommand = (cmd, data) => {
    socket.send(JSON.stringify({cmd: cmd, data: data, seq: seq++}));
};

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

