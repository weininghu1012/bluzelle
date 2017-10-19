describe('The tab panel', () => {
    const tabs = require('../getBaseElement')('ul.nav-tabs');

    it('should exist', () => {
        tabs().waitForExist('a=Log');
        tabs().waitForExist('a=Node List');
        tabs().waitForExist('a=Node Graph');
    });

    it('should go to the node list if the node list tab is clicked', () => {
        expect(browser.isExisting('div=alive')).to.be.false;
        tabs().click('=Node List');
        browser.waitForExist('div=alive', 2000);
    });
});