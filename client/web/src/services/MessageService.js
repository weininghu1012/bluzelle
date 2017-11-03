import {addCommandProcessor} from 'services/CommunicationService'
const messages = observable.shallowArray([]);
global.messages = messages;

addCommandProcessor('messages', arr => transaction(() => arr.forEach(m => messages.push(m))));

export const getMessages = () => messages;