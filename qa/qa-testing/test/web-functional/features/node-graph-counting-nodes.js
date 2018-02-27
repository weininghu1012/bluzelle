const {clickTab} = require('../utils');

describe('Node graph tab', () => {
    const body = require('../getBaseElement')('body');

    beforeEach(() => clickTab('Node Graph'));

    describe('counting the nodes', () => {
        it('should show nodes equal to the number written on screen', () => {
            body().waitForExist('div=1 Nodes');
            body().waitUntil(() => body().elements('circle').value.length === 2);
        });
    });
});
