describe('Log tab', () => {
    describe('Table Headers', () => {

        it('should contain table headers', () => {
            ['Level', 'Timestamp', 'Message', 'Node'].forEach( text => {
                browser.waitForExist (`div.widget-HeaderCell__value*=${text}`);
            });
        });
    });

    describe('Table rows', () => {

        it('should log node added', () => {
            ['info', new Date().toISOString().substring(0, 11), 'Node added', '127.0.0.1'].forEach( text => {
                browser.waitForExist('div.react-grid-Canvas>div>div');
                browser.waitForExist(`div*=${text}`);
            });
        });

        it('should log storage warning', () => {
            browser.waitForExist('div.react-grid-Canvas>div>div');
            emulator.setRandomNodeUsage(99);
            browser.waitForExist('div*=Usage is at');
        });
    });
});
