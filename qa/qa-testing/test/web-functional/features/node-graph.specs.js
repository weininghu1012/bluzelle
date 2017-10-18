describe('Node graph tab', () => {
    require('../base').getBase('div');

    describe('individual nodes', () => {
        it('should display specs when mouseover', () => {
            browser.waitForExist('=Node Graph');
            browser.click('=Node Graph');
            browser.waitForExist('circle[fill="green"]');
            browser.moveToObject('circle[fill="green"]');
            browser.waitForExist('td=alive');
        });
    })
});