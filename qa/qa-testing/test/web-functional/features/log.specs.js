describe('log tab', () => {
    describe('Table Headers', () =>{

        const header = require('../getBaseElement')('div.react-grid-HeaderRow');

        it('should contain table headers', () =>{
            ['Timer', 'Entry #', 'Timestamp', 'Message'].forEach(text =>{
                header().waitForExist (`div.widget-HeaderCell__value*=${text}`);
            });
        });
    });
});
