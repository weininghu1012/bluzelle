import {addCommandProcessor, sendCommand} from 'services/CommunicationService'

const settings = observable({});

addCommandProcessor('setMaxNodes', num => settings.maxNodes = num);

export const setMaxNodes = num => {
    settings.maxNodes = num;
    sendCommand('setMaxNodes', num);
};