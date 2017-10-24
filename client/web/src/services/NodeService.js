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
    foundNode ? extend(foundNode, node) : addNewNode(node);
};

const addNewNode = node => {
    const newNode = {nodeState: 'new', ...node};
    nodes.push(newNode);
    setTimeout(() => {
        const found = nodes.find(n => n.address === node.address);
        console.log(found)
        found && (found.nodeState = 'alive')
    },3000);
};

export const removeNodeByAddress = address => {
    const found = nodes.find(n => n.address === address);
    found && (found.nodeState = 'dead');
    setTimeout(() => {
        remove(nodes, n => n.address === address);
    }, 3000);
};

export const clearNodes = () => remove(nodes, () => true);

