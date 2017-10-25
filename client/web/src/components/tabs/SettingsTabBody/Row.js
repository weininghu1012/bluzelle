import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import invoke from 'lodash/invoke'

export default class Row extends Component {
    constructor() {
        super();
        this.state = {editing: false};
    }

    setEditing(v = true) {
        this.setState({editing: v});
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
            <Fixed style={{height: 43, lineHeight: '42px', marginBottom: 5, width: 500, borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
                    <Layout type="">
                        <Fixed style={{width: 100}}>
                            <label>{label}</label>
                        </Fixed>
                        <Flex>
                            {editing ? (
                                <input type={type} ref={r => this.input = r} defaultValue={value}/>
                            ) : waitingForUpdateValue ? (
                                <span style={{color: '#aaa'}}>{waitingForUpdateValue} (saving)</span>
                            ) : (
                                value
                            )}
                        </Flex>
                        <Fixed style={{width: 200}}>
                            {editing ? (
                                <ButtonGroup className="pull-right">
                                    <Button bsSize="small" onClick={this.setValue.bind(this)}>Set</Button>
                                    <Button bsSize="small" onClick={this.setEditing.bind(this, false)}>Cancel</Button>
                                </ButtonGroup>
                            ) : (
                                <Button className="pull-right" bsSize="small" onClick={this.setEditing.bind(this)}>Edit</Button>
                            )}
                        </Fixed>
                    </Layout>
            </Fixed>
        )
    }
}
