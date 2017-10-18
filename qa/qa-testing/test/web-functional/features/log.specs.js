describe('log tab', () => {
    describe('Table Headers', () =>{
        require('../base').getBase('div.react-grid-HeaderRow');
        it('@watch should contain table headers', () =>{
            ['Timer', 'Entry #', 'Timestamp', 'Message'].forEach(text =>{
               console.log('******',`div.widget-HeaderCell__value*="${text}"`);
                base.waitForExist (`div.widget-HeaderCell__value*="${text}"`);
            });
        });
    });
});
