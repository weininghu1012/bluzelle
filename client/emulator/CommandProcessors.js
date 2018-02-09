const {maxNodes} = require('./Values');
const {updateData, getData} = require('./DataStore');

module.exports = {
    setMaxNodes: num => maxNodes.set(num),
    updateData,
    getData
};