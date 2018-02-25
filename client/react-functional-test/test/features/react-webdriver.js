import {start, close} from '../testServer';
import {expect} from 'chai';

import {executeAsyncWithError} from "../../react-webdriver";


describe('React webdriver basics', () => {

    before(() => {
        start(8200);
    });

    beforeEach(() => {
        browser.url('http://localhost:8200');
    });

    after(() => {
        close();
    });


    // it('should be able to look up a react component', () => {
    //
    //     FindComponent('MyComponent');
    //     FindComponents('Multiple');
    //
    //     FindComponentWithProps('MyComponent', { whence: true });
    //
    //
    // });


    it('should find hooks', () => {

        browser.execute(() => {

            if (!window.hooks) {
                throw new Error('addHooks() not being called.');
            }

        });

    });


    it('should not expose app data with flag', () => {
        browser.url('http://localhost:8200/?noHooks');

        browser.execute(() => {

            if (window.hooks) {
                throw new Error('addHooks() is being called.');
            }

        });

    });

    //
    // it('should be able to find a named component', () => {
    //
    //     browser.waitForExist('button');
    //
    //     browser.execute(() => {
    //
    //         const App = TestUtils.findRenderedComponentWithType(
    //             root,
    //             components.App
    //         );
    //
    //         assert(() => App instanceof components.App);
    //
    //     });
    //
    // });


    it('should pipe assertion errors to chimp', () => {

        const errorFunction = () =>
            browser.execute(() => assert(() => false));

        expect(errorFunction).to.throw();

    });


    it('valid assertion should pass', () => {

        browser.execute(() => assert(() => true));

    });


    it('valid async should not fail', () => {

        executeAsyncWithError(browser, done => done());

    });


    it('async executions should fail properly', () => {

        const failure = () => executeAsyncWithError(browser, done =>
            throwAsync(new Error('Aw shucks'), done));

        expect(failure).to.throw();

    });


    it('should have a waitFor that runs correctly', () => {

        executeAsyncWithError(browser, done =>
            waitFor(() => assert(() => true), done).then(done));

    });


    it('should have a waitFor that fails after 500ms', () => {

        const failure = () => executeAsyncWithError(browser, done =>
            waitFor(() => assert(() => false), done));

        expect(failure).to.throw();

    });

});