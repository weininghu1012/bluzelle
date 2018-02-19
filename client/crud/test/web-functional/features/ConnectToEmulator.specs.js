import {start, shutdown, setData} from '../emulator/Emulator';
import executeAsyncWithError from '../executeAsyncWithError';

describe.only('Emulator connections', () => {

    it('should be able to connect to the emulator', () => {

        start();

        browser.url('http://localhost:8200/?expose=true');

        browser.waitForExist('button');

        browser.element('button').click();

        executeAsyncWithError(browser, done =>
            waitFor(() =>
                TestUtils.findRenderedComponentWithType(
                    root,
                    components.KeyList),
                done)
            .then(done));

        shutdown();

    });


    it('should be able to set data', () => {

        const data = {
            text: [1, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 44, 32, 116, 104, 105, 115, 32, 105, 115, 32, 115, 111, 109, 101, 32, 112, 108, 97, 105, 110, 32, 116, 101, 120, 116, 46]
        };

        start();

        setData(data);


        browser.url('http://localhost:8200/?expose=true');

        browser.waitForExist('button');

        browser.element('button').click();

        executeAsyncWithError(browser, done =>
            waitFor(() =>
                assert(() => services.getLocalDataStore().has('text')),
                done)
            .then(done));

        shutdown();

    });

});