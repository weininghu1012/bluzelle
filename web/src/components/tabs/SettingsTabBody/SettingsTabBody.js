import {settings, setMaxNodes} from 'services/SettingsService'
import Button from 'react-bootstrap/lib/Button'
import invoke from 'lodash/invoke'

@observer
export default class SettingsTabBody extends Component {

    doSetMaxNodes() {
        setMaxNodes(parseInt(this.maxNodesInput.value));
    }

    render() {
        return (
            <div style={{padding: 20}}>
                <Table>
                    <Row id="max-nodes-setting" label="Max Nodes" setFn={this.doSetMaxNodes.bind(this)} value={settings.maxNodes}>
                        <input key={settings.maxNodes} ref={r => this.maxNodesInput = r} type="number" defaultValue={settings.maxNodes}/>
                    </Row>
                </Table>
            </div>
        )
    }
}

const Table = ({children}) => <table>
    <tbody>{children}</tbody>
</table>;


class Row extends Component {
    constructor() {
        super();
        this.state = {editing: false};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.editing !== nextState.editing) ||
            (this.state.editing || nextState.editing === false);

    }

    setEditing() {
        this.setState({editing: true});
    }

    setValue() {
        this.setState({editing: false});
        invoke(this.props, 'setFn');
    }

    render() {
        const {label, children, setFn, id, value} = this.props;
        const {editing} = this.state;

        return (
            <tr id={id}>
                <th style={{paddingRight: 20}}>{label}</th>
                <td style={{width: 300}}>
                    {editing ? children : value}
                </td>
                <td style={{paddingLeft: 20}}>
                    {editing ? (
                        <Button bsSize="small" onClick={this.setValue.bind(this)}>Set</Button>
                    ) : (
                        <Button bsSize="small" onClick={this.setEditing.bind(this)}>Edit</Button>
                    )}
                </td>
            </tr>
        )
    }
}

