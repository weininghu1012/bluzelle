const _ = require('lodash');

describe('Node graph tab', () => {
    require('../base').getBase('div');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });

    describe('individual nodes', () => {
        _.each({green: ['alive', '0x01'], blue: ['dead', '0x02'], red: ['new', '0x03']}, (values,color) => {
            const [state,address] = values;
            it(`should display specs when mouseover on ${color} node`, () => {
                browser.waitForExist(`circle[fill="${color}"]`, 2000);
                browser.moveToObject(`circle[fill="${color}"]`);
                browser.waitForExist(`td=${state}`, 2000);
                browser.waitForExist(`td=${address}`, 2000);
            });
        });
    });
});