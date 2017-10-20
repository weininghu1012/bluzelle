import {addCommandProcessor, sendCommand} from 'services/CommunicationService'


export const settings = observable({
    maxNodes: 0
});

sendCommand('getMaxNodes');

addCommandProcessor('setMaxNodes', num => settings.maxNodes = num);

export const setMaxNodes = num => {
    sendCommand('setMaxNodes', num);
};