describe('Log tab', () => {
    describe('Table Headers', () => {
        const header = require('../getBaseElement')('div.react-grid-HeaderRow');

        it('should contain table headers', () => {
            ['Level', 'Timestamp', 'Message', 'Node'].forEach( text => {
                header().waitForExist (`div.widget-HeaderCell__value*=${text}`);
            });
        });
    });

    describe('Table rows', () => {
        const body = require('../getBaseElement')('div.react-grid-Grid');

        it('should log node added', () => {
            ['info', new Date().toISOString().substring(0, 11), 'Node added', '127.0.0.1'].forEach( text => {
                body().waitForExist('div.react-grid-Canvas>div>div');
                body().elements('div.react-grid-Canvas>div>div').value[0]
                    .waitForExist(`div*=${text}`);
            });
        });

        it('should log storage warning', () => {
            body().waitForExist('div.react-grid-Canvas>div>div');
            emulator.setRandomNodeUsage(99);
            body().elements('div.react-grid-Canvas>div>div')
                .waitForExist('div*=Usage is at');
        });
    });
});
