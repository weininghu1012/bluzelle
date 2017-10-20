const _ = require('lodash');

describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });
    describe('@watch counting the nodes', () =>{
       it('should show nodes equals to the number written on screen', () => {
          console.log('********', browser.elements('circle').length);
          var numberOfNodes = browser.elements('circle').length;
          browser.waitForExist(numberOfNodes + 'Nodes');
       });
    });
});