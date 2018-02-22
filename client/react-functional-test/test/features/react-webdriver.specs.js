const {start, close} = require('../testServer');

describe('React webdriver test utils', () => {

    it('should pass a test', () => {

    });


    it('should start webserver', () => {

        start(8200);

        browser.url('http://localhost:8200');

        close();

    });

});