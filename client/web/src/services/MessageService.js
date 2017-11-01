import {addCommandProcessor} from 'services/CommunicationService'
const messages = observable([]);
global.messages = messages;

addCommandProcessor('messages', arr => arr.forEach(m => messages.push(m)));

export const getMessages = () => messages;