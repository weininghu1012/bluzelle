describe('The tab panel', () => {
    const tabs = require('../getBaseElement')('ul.nav-tabs');

    it('@watch should exist', () => {
        tabs().waitForExist('a=Log');
        tabs().waitForExist('a=Message List');
        tabs().waitForExist('a=Node List');
        tabs().waitForExist('a=Node Graph');
    });
});