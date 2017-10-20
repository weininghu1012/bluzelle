import Tabs from './MainTabs'
import NodeGraph from 'components/tabs/NodeGraph'
import NodeListTabBody from 'components/tabs/NodeListTabBody'
import LogTabBody from 'components/tabs/LogTabBody'
import SettingsTabBody from 'components/tabs/SettingsTabBody'
import Header from './Header'

export default class Main extends Component {
    render() {
        return (
            <Layout type="column">
                <Fixed>
                    <Header />
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
                        <Route path="/node-list" component={NodeListTabBody}/>
                        <Route path="/settings" component={SettingsTabBody}/>
                        <Route component={LogTabBody}/>
                    </Switch>
                </Flex>
            </Layout>
        )
    }
}


