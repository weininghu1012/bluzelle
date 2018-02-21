import ReactDom from 'react-dom'
import {App} from "./components/App"
import 'react-reflex/styles.css'
import TestUtils from 'react-dom/test-utils';

const root = ReactDom.render(<App />, document.querySelector('#app-container'));


if(window.location.href.includes('?expose=true')) {

    window.root = root;
    window.TestUtils = TestUtils;
    window.ReactDom = ReactDom;

    // Usage: assert(() => 1 + 1 === 2);
    window.assert = fn => {
        if(typeof fn !== 'function') {
            throw new Error('Must pass function to assert.');
        }

        if(!fn()) {
            throw new Error(fn.toString());
        }
    };

    window.throwAsync = (err, done) => {
        done({
            name: err.name,
            stack: err.stack,
            message: err.message
        });
    };

    window.waitFor = (fn, done, timeout=500) => {
        const start = new Date().getTime();

        const loop = (resolve, reject) => {
            try {
                fn();
                resolve();
            } catch(e) {
                if(new Date().getTime() - start > timeout) {
                    e.name = "(waitFor timeout) " + e.name;
                    throwAsync(e, done);
                }

                setTimeout(loop, 100, resolve, reject);
            }
        };

        return new Promise(loop);
    };

    window.components = {};

    const componentsContext = require.context('./components', true, /\.js/);
    componentsContext.keys().forEach(path =>

        // Do not include test files
        path.includes('specs') ||

            Object.assign(window.components, componentsContext(path)));


    window.services = {};

    const servicesContext = require.context('./services', true, /Service\.js/);
    servicesContext.keys().forEach(path =>
        Object.assign(window.services, servicesContext(path)));

}