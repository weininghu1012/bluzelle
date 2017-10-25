import Button from 'react-bootstrap/lib/Button'
import invoke from 'lodash/invoke'

export default class Row extends Component {
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
            <tbody id={id} style={{width: 450, display: 'block', paddingBottom: 3, borderBottom: '1px solid #ddd', marginBottom: 10}}>
            <tr>
                <th style={{paddingRight: 20, whiteSpace: 'nowrap'}}>{label}</th>
                <td style={{width: '100%'}}>
                    {editing ? (
                        <input type={type} ref={r => this.input = r} defaultValue={value}/>
                    ) : waitingForUpdateValue ? (
                        <span style={{color: '#aaa'}}>{waitingForUpdateValue} (saving)</span>
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
            </tbody>
        )
    }
}
