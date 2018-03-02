const {clickTab} = require('../../utils');

describe('Node graph load tests', () => {

    beforeEach(() => clickTab('Node Graph'));

    it('should be able to handle 50 nodes quickly', () => {
        emulator.setMaxNodes(50);
        const start = new Date().getTime();
        browser.waitUntil(() =>  browser.elements('circle').value.length === 100, 15000);
        expect(new Date().getTime() - start).to.be.at.most(15000);
    });
});
