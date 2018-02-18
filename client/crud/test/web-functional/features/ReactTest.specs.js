describe('React test utilities', () => {

    it('should not expose app data without flag', () => {

        browser.url('http://localhost:8200');

        browser.execute(() => {

            if(window.TestUtils || window.components || window.app) {
                throw new Error('App data is exposed');
            }

        });

    });

    it('should expose app data with flag', () => {

        browser.url('http://localhost:8200/?expose=true');

        browser.execute(() => {

            if(!TestUtils || window.components === undefined || window.app === undefined) {
                throw new Error('App data not exposed in browser.');
            }

        });
    });


    it('should be able to find the app component', () => {

        browser.url('http://localhost:8200/?expose=true');

        browser.waitForExist('button');

        browser.execute(() => {

            const App = TestUtils.findRenderedComponentWithType(
                app,
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

});