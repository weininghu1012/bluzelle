import {HashRouter, Route} from 'react-router-dom'
import {Main} from 'components/Main'

export const App = () => (
    <div style={{height: '100%'}}>
        <HashRouter>
            <Route component={Main} />
        </HashRouter>
    </div>
);

