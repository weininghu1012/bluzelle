const {clickTab} = require('../utils');

describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => clickTab('Node Graph'));

    describe('@watch counting the nodes', () => {
        it('should show nodes equals to the number written on screen', () => {
            browser.waitForExist('circle');
            const numberOfNodes = browser.elements('circle').value.length;
            browser.waitForExist(`div=${numberOfNodes} Nodes`);
        });
    });
});