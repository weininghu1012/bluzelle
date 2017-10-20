import {settings, setMaxNodes} from 'services/SettingsService'
import Button from 'react-bootstrap/lib/Button'
import invoke from 'lodash/invoke'

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

const Table = ({children}) => <table>
    <tbody>{children}</tbody>
</table>;

class Row extends Component {
    constructor() {
        super();
        this.state = {editing: false};
    }

    setEditing() {
        this.setState({editing: true});
    }

    setValue() {
        const value = this.props.type === 'number' ? parseInt(this.input.value) : this.input.value;
        this.setState({editing: false, waitingForUpdateValue: value});
        invoke(this.props, 'setFn', value);
    }

    componentWillReceiveProps(newProps) {
        const waitingForUpdateValue = this.state.waitingForUpdateValue;
        waitingForUpdateValue && newProps.value === waitingForUpdateValue && this.setState({waitingForUpdateValue: undefined});
    }

    render() {
        const {label, type, id, value} = this.props;
        const {editing, waitingForUpdateValue} = this.state;

        return (
            <tr id={id}>
                <th style={{paddingRight: 20}}>{label}</th>
                <td style={{width: 300}}>
                    {editing ? (
                        <input type={type} ref={r => this.input = r} defaultValue={value}/>
                    ) : waitingForUpdateValue ? (
                        <span style={{color: '#aaa'}}>{waitingForUpdateValue}</span>
                    ) : (
                        value
                    )}
                </td>
                <td style={{paddingLeft: 20}}>
                    {editing ? (
                        <Button disabled={false} bsSize="small" onClick={this.setValue.bind(this)}>Set</Button>
                    ) : (
                        <Button bsSize="small" onClick={this.setEditing.bind(this)}>Edit</Button>
                    )}
                </td>
            </tr>
        )
    }
}

