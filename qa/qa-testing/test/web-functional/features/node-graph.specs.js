describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph');
        browser.click('=Node Graph');
    });

    describe('multiple nodes', () => {
        it('should show the number of nodes set by the emulator', () => {
            emulator.setMaxNodes(5);
            browser.waitUntil(() => browser.elements('circle').value.length === 10);
        });
    });

    describe('individual nodes', () => {
        it('should display specs when mouseover on a node', () => {
            const node = emulator.getNodes()[0];
                browser.waitForExist(`g[data-test='node-${node.ip}-${node.port}']`);
                browser.moveToObject(`g[data-test='node-${node.ip}-${node.port}']`);
                browser.waitForExist(`td=${node.address}`);
                browser.waitForExist(`span*=${node.available}`);
                browser.waitForExist(`span*=${node.used}`);
            ['new', 'alive'].forEach( status => {
                browser.waitForExist(`div=${status}`);
            });
        });
    });
});
