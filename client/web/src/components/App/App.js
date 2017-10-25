import {HashRouter, Route} from 'react-router-dom'
import './bootstrap/css/darkly.css'
import './style.css'
//import 'bootstrap/dist/css/bootstrap.css'
import {socketState} from 'services/CommunicationService'
import Main from 'components/Main'
import DaemonSelector from 'components/DaemonSelector'

const App = () => {
    const component = socketState.get() === 'open' ? Main : DaemonSelector;
    return (
        <HashRouter>
            <Route component={component} />
        </HashRouter>
    )
};

export default observer(App)

