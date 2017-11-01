import remove from 'lodash/remove'
import {sendCommand, addCommandProcessor} from 'services/CommunicationService'
import extend from 'lodash/extend'
import {socketState} from 'services/CommunicationService'


const nodes = observable([]);

addCommandProcessor('updateNodes', (nodes) => nodes.forEach(updateNode));
addCommandProcessor('removeNodes', (addresses) => addresses.forEach(removeNodeByAddress));

autorun(() => socketState.get() === 'open' && untracked(resetNodes));

const resetNodes = () => {
    sendCommand("getAllNodes", undefined);
    clearNodes();
};

export const getNodes = () => nodes.filter(n => n.address);

export const updateNode = node => {
    const foundNode = nodes.find(n => n.address === node.address);

    if(foundNode) {
        foundNode.messageDelta = node.messages - foundNode.messages
        setTimeout(() => foundNode.messageDelta = 0, 500);
        extend(foundNode, node)
    } else {
        addNewNode(node);
    }
};

const addNewNode = node => {
    const newNode = {nodeState: 'new', ...node};
    const slot = nodes.find(n => n.address === undefined);
    slot ? extend(slot, newNode) : nodes.push(newNode);
    setTimeout(() => {
        const found = nodes.find(n => n.address === node.address);
        found && (found.nodeState = 'alive')
    },3000);
};

export const removeNodeByAddress = address => {
    const found = nodes.find(n => n.address === address);
    found && (found.nodeState = 'dead');
    setTimeout(() => {
        found && (found.address = undefined);
    }, 2000);
};

export const clearNodes = () => remove(nodes, () => true);

