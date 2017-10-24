import remove from 'lodash/remove'
import {sendCommand, addCommandProcessor} from 'services/CommunicationService'
import extend from 'lodash/extend'
import {socketState} from 'services/CommunicationService'


const nodes = observable([]);
global.nodes = nodes;

addCommandProcessor('updateNodes', (nodes) => nodes.forEach(updateNode));
addCommandProcessor('removeNodes', (addresses) => addresses.forEach(removeNodeByAddress));

autorun(() => socketState.get() === 'open' && untracked(resetNodes));

const resetNodes = () => {
    sendCommand("getAllNodes");
    clearNodes();
};

export const getNodes = () => nodes;

export const updateNode = node => {
    const foundNode = nodes.find(n => n.address === node.address);

    if(foundNode) {
        foundNode.messageDelta = node.messages - foundNode.messages
        setTimeout(() => foundNode.messageDelta = 0, 500);
    }
    foundNode ? extend(foundNode, node) : nodes.push(node);
};

export const removeNodeByAddress = address => remove(nodes, n => n.address === address);

export const clearNodes = () => remove(nodes, () => true);

