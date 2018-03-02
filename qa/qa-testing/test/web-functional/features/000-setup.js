global.emulator = require('../../../emulator/Emulator');
const nodes = require('../../../emulator/NodeStore').nodes;

emulator.start(8200);

beforeEach('setup', () => {
    console.log('nodes before: ', nodes.keys());

    Promise.all(emulator.shutdown())
        .then(() => console.log('Nodes all shutdown.'));

    emulator.setMaxNodes(1);

    browser.pause(400); // wait for node to be added
    console.log('nodes after', nodes.keys());
    browser.waitForExist('header');
});


