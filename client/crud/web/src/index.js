import ReactDom from 'react-dom'
import {App} from "./components/App"
import 'react-reflex/styles.css'
import TestUtils from 'react-dom/test-utils';

const root = ReactDom.render(<App />, document.querySelector('#app-container'));

// testHooks({ root, TestUtils  });

if(window.location.href.includes('?expose=true')) {

    window.root = root;
    window.TestUtils = TestUtils;
    window.ReactDom = ReactDom;


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