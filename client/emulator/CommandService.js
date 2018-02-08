const commandProcessors = [];

module.exports = {
    addCommandProcessor: (name, fn) => commandProcessors[name] = fn,
    receiveMessage: (data, node) => {
        const msg = JSON.parse(data);
        commandProcessors[msg.cmd] ? commandProcessors[msg.cmd](msg.data, node) : console.error(`${msg.cmd} has no command processor`)
    }
};