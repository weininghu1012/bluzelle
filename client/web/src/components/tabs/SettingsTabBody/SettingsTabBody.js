import {settings, setMaxNodes} from 'services/SettingsService'
import Table from './Table'
import Row from './Row'

@observer
export default class SettingsTabBody extends Component {

    render() {
        return (
            <div style={{padding: 20}}>
                <Table>
                    <Row id="max-nodes-setting" label="Max Nodes" setFn={setMaxNodes} type="number" value={settings.maxNodes}/>
                </Table>
            </div>
        )
    }
}


