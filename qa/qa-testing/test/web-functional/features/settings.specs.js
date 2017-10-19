describe('Settings tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Settings', 2000);
        browser.click('=Settings');
    });

    describe('@watch Changing Max Nodes value', () => {
       it('should change the value of Max Nodes', () => {
           console.log('***************', browser.element('[type=number]'));
           browser.setValue('[type=number]',6);
           browser.click('button=Set');
       });
    });
});