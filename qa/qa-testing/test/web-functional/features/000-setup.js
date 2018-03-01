global.emulator = require('../../../emulator/Emulator');
emulator.start(8200);

beforeEach(() => {
   emulator.setMaxNodes(1);
   Promise.all(emulator.shutdown())
       .then(() => console.log('Nodes all shutdown.'));
});


