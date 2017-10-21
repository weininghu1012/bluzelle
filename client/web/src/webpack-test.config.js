const config = require('./webpack.config.js');
const path = require('path');

config.entry = {test: path.resolve('./test.js')};

config.resolve.alias = Object.assign({
    'services/CommunicationService': path.resolve('./mocks/MockCommunicationService'),
}, config.resolve.alias);

config.module.rules.push({
    test: /\.js$|\.jsx$/,
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true}
    },
    enforce: 'post',
    exclude: [/node_modules|\.specs\.js$/, /test\.js/],
});

module.exports = config;

