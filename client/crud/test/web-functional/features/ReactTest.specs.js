const executeAsyncWithError = require('../executeAsyncWithError');

describe('React test utilities', () => {

    it('should not expose app data without flag', () => {

        browser.url('http://localhost:8200');

        browser.execute(() => {

            if(window.TestUtils || window.components || window.root) {
                throw new Error('App data is exposed');
            }

        });

    });

    it('should expose app data with flag', () => {

        browser.url('http://localhost:8200/?expose=true');

        browser.execute(() => {

            if(!TestUtils || window.components === undefined || window.root === undefined) {
                throw new Error('App data not exposed in browser.');
            }

        });
    });


    it('should be able to find the app component', () => {

        browser.url('http://localhost:8200/?expose=true');

        browser.waitForExist('button');

        browser.execute(() => {

            const App = TestUtils.findRenderedComponentWithType(
                root,
                components.App
            );

            assert(() => App instanceof components.App);

        });

    });


    it('should pipe assertion errors to chimp', () => {

        browser.url('http://localhost:8200/?expose=true');

        const errorFunction = () =>
            browser.execute(() => assert(() => true === false));

        expect(errorFunction).to.throw();

    });


    it('valid async should not fail', () => {

        browser.url('http://localhost:8200/?expose=true');

        executeAsyncWithError(browser, done => done());

    });


    it('async executions should fail properly', () => {

        browser.url('http://localhost:8200/?expose=true');

        const failure = () => executeAsyncWithError(browser, done =>
            throwAsync(new Error('Aw shucks'), done));

        expect(failure).to.throw();

    });


    it('should have a waitFor that runs correctly', () => {

        browser.url('http://localhost:8200/?expose=true');

        executeAsyncWithError(browser, done =>
            waitFor(() => assert(() => true), done).then(done));

    });


    it('should have a waitFor that fails after 500ms', () => {

        browser.url('http://localhost:8200/?expose=true');

        const failure = () => executeAsyncWithError(browser, done =>
            waitFor(() => assert(() => false), done));

        expect(failure).to.throw();

    });

});