describe('web page header', () => {
    const header = require('../getBaseElement')('#app-container>div>div');

    it('should exist', () => {
        header().waitForExist('img');
        expect(header().getAttribute('img', 'src')).to.contain('data');
    });
});