export const commandProcessors = {};

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

export const sendCommand = (cmd, data) => {}