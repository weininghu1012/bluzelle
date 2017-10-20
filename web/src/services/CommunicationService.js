let socket;
let seq = 0;
let commandProcessors = [];

export const socketState = observable(0);


setTimeout(() => startSocket());

const startSocket = () => {
    socket = new WebSocket(`ws://${window.location.host}`);
    socketState.set(socket.readyState);

    socket.onopen = () => socketState.set(socket.readyState);

    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        commandProcessors[msg.cmd] ? commandProcessors[msg.cmd](msg.data) : console.error(`${msg.cmd} has no command processor`)
    };

    socket.onclose = () => {
        socketState.set(socket.readyState);
        setTimeout(() => startSocket(), 500);
    };

    socket.onerror = () => {
        socketState.set(socket.readyState);
    };
};

export const sendCommand = (cmd, data) => {
    socket && socket.readyState === WebSocket.OPEN ? (
        socket.send(JSON.stringify({cmd: cmd, data: data, seq: seq++}))
    ) : (
        setTimeout(() => sendCommand(cmd, data), 100)
    )
};

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

