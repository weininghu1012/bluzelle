const {start, close} = require('../testServer');
const {expect} = require('chai');

describe('React webdriver test utils', () => {

    before(() => {
        start(8200);
        browser.url('http://localhost:8200');
    });

    after(() => {
        close();
    });

});