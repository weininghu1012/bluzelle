const {clickTab} = require('../../utils');

describe('Node list load tests', () => {

    beforeEach(() => clickTab('Node List'));

    it('should be able to handle a lot of nodes quickly', () => {
        // There seems to be some side effects that limits how many nodes can be created and listed.
        // At one point it was consistently hitting a ceiling of 39, now it's at 27. Restarting mac
        // didn't help.

        const NUM_OF_NODES = 27

        emulator.setMaxNodes(NUM_OF_NODES);
        const start = new Date().getTime();
        browser.waitUntil(() =>  browser.elements('div.react-grid-Canvas>div>div').value.length === NUM_OF_NODES, 15000);
        expect(new Date().getTime() - start).to.be.at.most(15000);
    });
});
