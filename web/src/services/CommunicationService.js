let socket;
let seq = 0;
let commandProcessors = [];
let socketReady = false;

setTimeout(() => startSocket());


const startSocket = () => {
    socket = new WebSocket(`ws://${window.location.host}`);
    socket.onopen = () => socketReady = true;
    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        commandProcessors[msg.cmd] ? commandProcessors[msg.cmd](msg.data) : console.error(`${msg.cmd} has no command processor`)
    }
};

export const sendCommand = (cmd, data) => {
    socketReady ? (
        socket.send(JSON.stringify({cmd: cmd, data: data, seq: seq++}))
    ) : (
        setTimeout(() => sendCommand(cmd, data), 100)
    )
};

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

