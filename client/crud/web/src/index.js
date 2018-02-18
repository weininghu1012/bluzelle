import ReactDom from 'react-dom'
import {App} from "./components/App"
import 'react-reflex/styles.css'
import TestUtils from 'react-dom/test-utils';

const app = ReactDom.render(<App />, document.querySelector('#app-container'));


if(window.location.href.includes('?expose=true')) {

    window.app = app;
    window.TestUtils = TestUtils;
    window.ReactDom = ReactDom;

    // Usage: assert(() => 1 + 1 === 2);
    window.assert = fn => {
        if(!fn()) {
            throw new Error(fn.toString());
        }
    };

    window.components = {};

    // Add all components to window
    const componentsContext = require.context('./components', true, /\.js/);
    componentsContext.keys().forEach(path =>
        path.includes('specs') ||
            Object.assign(window.components, componentsContext(path)));

}


// Load files in /services
// const testsContext = require.context('./services', true, /Service\.js$/);
// testsContext.keys().forEach(testsContext);
