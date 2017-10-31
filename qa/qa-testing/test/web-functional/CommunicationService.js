const _ = require('lodash');

export const sendCommand = (cmd, data) => {
    browser.waitForExist('#test-message-receiver',5000);
    browser.setValue('#test-message-receiver textarea', `${JSON.stringify({cmd: cmd, data:data})}`);
    browser.click('#test-message-receiver button');
};

export const addNode = (data = {}) => {
    const nodeInfo = {address: `0x99999999999${_.uniqueId()}`, messages: 20, ...data};
    sendCommand('updateNodes', [nodeInfo]);
    return nodeInfo;
};

export const updateNode = (address, data = {}) => {
    sendCommand('updateNodes', [{address: address, ...data}]);
};

export const sendLogMessage = (message) => {
    sendCommand('log', {timestamp: 'some time here', timer_no: 1, entry_no: _.uniqueId(), message: message});
};

