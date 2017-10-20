const _ = require('lodash');

describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });
    describe('counting the nodes', () => {
        it('should show nodes equals to the number written on screen', () => {
            browser.waitForExist('circle');
            const numberOfNodes = browser.elements('circle').value.length;
            browser.waitForExist(`div=${numberOfNodes} Nodes`);
        });
    });
});