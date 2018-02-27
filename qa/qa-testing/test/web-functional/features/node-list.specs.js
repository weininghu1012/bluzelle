const {clickTab} = require('../utils');
const _ = require('lodash');

describe('Node List tab', () => {
    const main = require('../getBaseElement')('div.react-grid-Main');


    describe('Table Headers', () => {

        beforeEach(() => clickTab('Node List'));

        it('should contain table headers', () => {
            ['Address', 'Status', 'Actions'].forEach(text => {
                main().waitForExist(`div.widget-HeaderCell__value*=${text}`);
            });
        });
    });

    describe('Table Rows', () => {
        const NUM_OF_NODES = 2;

        beforeEach(() => {
            clickTab('Node List');
            emulator.setMaxNodes(NUM_OF_NODES);
        });

        it('should show all nodes', () => {
            main().waitUntil(() => {
                return main().elements('div.react-grid-Canvas>div>div').value.length === NUM_OF_NODES
            }, 5000, 'expected nodes to equal number set by emulator');
        });

        it('should show all nodes to be new then alive', () => {
            main().waitUntil(() =>
                main().elements('div.react-grid-Canvas>div>div').value.length === NUM_OF_NODES
            );

            ['new', 'alive'].forEach(status =>
                _.times(NUM_OF_NODES).forEach(idx =>
                    main().elements('div.react-grid-Canvas>div>div').value[idx]
                        .waitForExist(`div=${status}`)
                )
            );
        });
    });
});
