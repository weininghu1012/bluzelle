describe('@watch Node List tab', () => {

    describe('Table Headers', () => {
        require('../getBaseElement')('div.react-grid-HeaderRow');

        beforeEach(() => {
            browser.waitForExist('=Node List', 2000);
            browser.click('=Node List');
        });
       it('should contain table headers', () => {
           const header = browser.element('div.react-grid-HeaderRow');
          ['Address', 'Status', 'Messages'].forEach(text => {
            header.waitForExist(`div.widget-HeaderCell__value*=${text}`);
          });
       });
    });
});