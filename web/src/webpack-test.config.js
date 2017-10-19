const config = require('./webpack.config.js');
const path = require('path');

config.entry = {test: path.resolve('./test.js')};
config.resolve.alias = Object.assign({
    'services/CommunicationService': path.resolve('./mocks/MockCommunicationService'),
}, config.resolve.alias);

module.exports = config;

