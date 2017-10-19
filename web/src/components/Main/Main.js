import Tabs from './MainTabs'
import NodeGraph from 'components/tabs/NodeGraph'
import NodeListView from 'components/tabs/NodeListView'
import LogComponent from 'components/tabs/LogComponent'
import SettingsTabBody from 'components/tabs/SettingsTabBody'

import logo from './logo-color.png'

export default class Main extends Component {
    render() {
        return (
            <Layout type="column">
                <Fixed>
                    <div style={{height: 50, padding: 2}}>
                        <img src={logo} />
                    </div>
                    <div style={{height: 6}}/>
                </Fixed>
                <Fixed>
                    <div style={{height: 40}}>
                        <Tabs/>
                    </div>
                </Fixed>
                <Flex style={{overflow: 'auto'}}>
                    <Switch>
                        <Route path="/node-graph" component={NodeGraph}/>
                        <Route path="/node-list" component={NodeListView} />
                        <Route path="/settings" component={SettingsTabBody} />
                        <Route component={LogComponent}/>
                    </Switch>
                </Flex>
            </Layout>
        )
    }
}