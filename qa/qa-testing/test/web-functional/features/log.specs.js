describe('log tab', () => {
    describe('Table Headers', () =>{
        const header = require('../base').getBase('div.react-grid-HeaderRow');
        it('@watch should contain table headers', () =>{
           console.log(base.element('.react-grid-HeaderCell').value.length);
        });
    });

    require('../base').getBase('div');
    it('should display log entries', () =>{

    });
});
