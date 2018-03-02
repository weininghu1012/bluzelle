global.emulator = require('../../../emulator/Emulator');
const nodes = require('../../../emulator/NodeStore').nodes;

emulator.start(8200);

beforeEach('setup', async () => {

    await Promise.all(emulator.shutdown());
    emulator.setMaxNodes(1);
    browser.waitUntil(() => nodes.keys().length);
    browser.pause(400);
});


