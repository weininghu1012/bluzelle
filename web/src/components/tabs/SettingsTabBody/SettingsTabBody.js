import {settings, setMaxNodes} from 'services/SettingsService'
import Button from 'react-bootstrap/lib/Button'

@observer
export default class SettingsTabBody extends Component {

    doSetMaxNodes() {
        setMaxNodes(parseInt(this.maxNodesInput.value));
    }

    render() {
        return (
            <div style={{padding: 20}}>
            <Table>
                <Row id="max-nodes-setting" label="Max Nodes" setFn={this.doSetMaxNodes.bind(this)}>
                    <input key={settings.maxNodes} ref={r => this.maxNodesInput = r} type="number" defaultValue={settings.maxNodes} />
                </Row>
            </Table>
            </div>
        )
    }
}

const Table = ({children}) => <table><tbody>{children}</tbody></table>;

const Row = ({label, children, setFn, id}) => (
      <tr id={id}>
          <th style={{paddingRight: 20}}>{label}</th>
          <th>{children}</th>
          <th style={{paddingLeft: 20}}><Button bsSize="small" onClick={setFn}>Set</Button></th>
      </tr>
);