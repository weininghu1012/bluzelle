describe('web page header', () => {
    let header;
    beforeEach(() => {
        browser.url('http://localhost:3000');
        header = browser.element('#app-container>div>div');
    });

    it('should exist', () => {
        header.waitForExist('img');
        expect(header.getAttribute('img', 'src')).to.contain('data');
    });
});