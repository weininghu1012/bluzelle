describe('The tab panel', () => {
    require('../base').getBase('ul.nav-tabs');

    it('should exist', () => {
        base.waitForExist('a=Log');
        base.waitForExist('a=Node List');
        base.waitForExist('a=Node Graph');
    });

    it('should go to the node list if the node list tab is clicked', () => {
        expect(browser.isExisting('div=alive')).to.be.false;
        base.click('=Node List');
        browser.waitForExist('div=alive', 2000);
    });
});