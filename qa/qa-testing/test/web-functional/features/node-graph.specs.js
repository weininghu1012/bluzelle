const _ = require('lodash');
import {addNode, updateNode} from "../CommunicationService";

describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });

    describe('@watch individual nodes', () => {
        _.each({green: 'alive', red: 'dead', blue: 'new'}, (state, color) => {
            it(`should display specs when mouseover on ${color} node`, () => {
                const nodeInfo = addNode({nodeState: state});
                updateNode(nodeInfo.address, {nodeState: state});
                browser.waitForExist(`g#node-${nodeInfo.address}`);
                browser.moveToObject(`g#node-${nodeInfo.address}`);
                browser.waitForExist(`td=${state}`, 2000);
                browser.waitForExist(`td=${nodeInfo.address}`, 2000);
            });
        });
    });
});