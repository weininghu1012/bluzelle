import {start, shutdown} from '../emulator/Emulator';

describe('acceptance test for acceptance tests', () => {

    beforeEach(() => {
        start(8100);
    });

    afterEach(() => {
        shutdown();
    });

    it('has title Bluzelle', () => {

        browser.url('http://localhost:8200');
        expect(browser.getTitle()).to.equal('Bluzelle');

    });

    it('Can open two browser tabs.', () => {

        browser.url('http://localhost:8200');
        browser.newWindow('http://localhost:8200');

        const [firstWindow, secondWindow] = browser.getTabIds();

        expect(firstWindow.length > 10);
        expect(secondWindow.length > 10);


        browser.switchTab(firstWindow);

        browser.waitForExist('button');
        browser.element('button').click();

        browser.switchTab(secondWindow);

        browser.waitForExist('button');
        browser.element('button').click();


        // browser.element('=Start Emulator').click();
        // browser.element('=Go').click();
        //
        // browser.switchTab(secondWindow);
        //
        // browser.element('=Go').click();
        //

    });



});