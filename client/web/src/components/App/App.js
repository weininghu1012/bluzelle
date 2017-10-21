import {HashRouter, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {daemonUrl} from 'services/CommunicationService'
import Main from 'components/Main'
import DaemonSelector from 'components/DaemonSelector'

const App = () => {
    const component = daemonUrl.get() ? Main : DaemonSelector;
    return (
        <HashRouter>
            <Route component={component} />
        </HashRouter>
    )
};

export default observer(App)

