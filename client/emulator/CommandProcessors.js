const {maxNodes} = require('./Values');
const {sendChangesToNode, requestDataFromNode} = require('./DataStore');

module.exports = {
    setMaxNodes: num => maxNodes.set(num),
    sendChangesToNode,
    requestDataFromNode
};