let socket;
let seq = 0;
let commandProcessors = [];
const RETRY_TIME = 1000;

export const socketState = observable('closed');
export const daemonUrl = observable(undefined);
export const closeCode = observable(undefined);
export const disconnect = () => {
    daemonUrl.set(undefined);
    socket.close();
};

autorun(() => daemonUrl.get() && startSocket(daemonUrl.get()));



const setSocketState = () => socketState.set(socketStates[socket.readyState]);

const startSocket = (url) => {
    socket = new WebSocket(`ws://${url}`);
    setSocketState();
    closeCode.set(undefined);

    socket.onopen = setSocketState;

    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        commandProcessors[msg.cmd] ? commandProcessors[msg.cmd](msg.data) : console.error(`${msg.cmd} has no command processor`)
    };

    socket.onclose = (ev) => {
        // the code according to https://tools.ietf.org/html/rfc6455#section-11.7
        closeCode.set(ev.code);
        setSocketState();
        setTimeout(() => daemonUrl.get() && startSocket(), RETRY_TIME);
    };

    socket.onerror = (ev) => {
        daemonUrl.set(undefined);
        setSocketState();
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

const socketStates = ['opening', 'open', 'closing', 'closed'];