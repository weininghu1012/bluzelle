import {addCommandProcessor, sendCommand} from 'services/CommunicationService'

export const settings = observable({
    maxNodes: 0
});

addCommandProcessor('setMaxNodes', num => settings.maxNodes = num);

export const setMaxNodes = num => {
    settings.maxNodes = num;
    sendCommand('setMaxNodes', num);
};