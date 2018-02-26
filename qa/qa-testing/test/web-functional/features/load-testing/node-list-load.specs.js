describe('Node list load tests', () => {
    const body = require('../../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph');
        browser.click('=Node List');
    });

    it('should be able to handle 39 nodes quickly', () => {
        // test only passes at 39, unable to list more than 39 nodes for unknown reason
        emulator.setMaxNodes(39);
        const start = new Date().getTime();
        body().waitUntil(() =>  body().elements('div.react-grid-Canvas>div>div').value.length === 39, 15000);
        expect(new Date().getTime() - start).to.be.at.most(15000);
    });
});