import {socketState, addCommandProcessor, sendCommand} from 'services/CommunicationService'


export const settings = observable({
    maxNodes: 0
});

autorun(() => socketState.get() === 'open' && untracked(getAllSettings));

const getAllSettings = () => {
    sendCommand('getMaxNodes');
};

addCommandProcessor('setMaxNodes', num => settings.maxNodes = num);

export const setMaxNodes = num => {
    sendCommand('setMaxNodes', num);
};