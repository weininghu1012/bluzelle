describe('Node graph tab', () => {
    require('../base').getBase('div');

    describe('individual nodes', () => {
        it('@watch should display specs when mouseover', () => {
            browser.waitForExist('=Node Graph', 5000);
            browser.click('=Node Graph');
            browser.waitForExist('circle[fill="green"]');
            browser.moveToObject('circle[fill="green"]');
            browser.waitForExist('td=alive');
        });
    })
});