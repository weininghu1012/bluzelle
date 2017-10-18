describe('log tab', () => {
    describe('Table Headers', () =>{
        require('../base').getBase('div.react-grid-HeaderRow');
        it('should contain table headers', () =>{
            ['Timer', 'Entry #', 'Timestamp', 'Message'].forEach(text =>{
                base.waitForExist (`div.widget-HeaderCell__value*=${text}`);
            });
        });
    });
});
