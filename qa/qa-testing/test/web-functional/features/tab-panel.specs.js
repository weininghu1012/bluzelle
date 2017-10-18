describe('The tab panel', () => {
    const tabs = require('../getBaseElement')('ul.nav-tabs');

    it('should exist', () => {
        tabs.el.waitForExist('a=Log');
        tabs.el.waitForExist('a=Node List');
        tabs.el.waitForExist('a=Node Graph');
    });

    it('@watch should go to the node list if the node list tab is clicked', () => {
        expect(browser.isExisting('div=alive')).to.be.false;
        tabs.el.click('=Node List');
        browser.waitForExist('div=alive', 750);
    });
});