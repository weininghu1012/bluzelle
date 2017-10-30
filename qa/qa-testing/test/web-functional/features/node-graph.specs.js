const _ = require('lodash');
import {addNode, updateNode} from "../CommunicationService";

describe('@watch Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });

    describe('individual nodes', () => {
        _.each({green: 'alive', red: 'dead', blue: 'new'}, (state, color) => {
            it(`should display specs when mouseover on ${color} node`, () => {
                const nodeInfo = addNode({nodeState: state});
                updateNode(nodeInfo.address, {nodeState: state});
                checkInfoTable(nodeInfo.address, state);
                browser.waitForExist(`td=${nodeInfo.address}`, 2000);
            });
        });
        it('should show the number of messages on mouse over', () => {
           const nodeInfo = addNode ({messages:0});
           checkInfoTable(nodeInfo.address, '0');

           updateNode(nodeInfo.address, {messages:1});
           checkInfoTable(nodeInfo.address, '1');
        });
    });
});

const checkInfoTable = (address, value) => {
    browser.waitForExist(`g#node-${address}`);
    browser.moveToObject(`g#node-${address}`);
    browser.waitForExist(`td=${value}`, 2000);
}