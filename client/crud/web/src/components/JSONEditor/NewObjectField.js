import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";

export class NewObjectField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentInput: 'key', // or 'val' or 'none'
            key: 'key',
            val: 'val'
        };
    }

    render() {
        return (
            <div>
                <EditableField
                    active={this.state.currentInput === 'key'}
                    val={this.state.key}
                    onChange={key => {
                        this.setState({ currentInput: 'val', key })
                    }}/>:

                <EditableField
                    active={this.state.currentInput === 'val'}
                    val={this.state.val}
                    onChange={val => {
                        this.setState({ currentInput: 'none', val });

                        try {
                            const obj = observableMapRecursive(JSON.parse(val));
                            this.props.onChange(this.state.key, obj);
                        } catch(e) {
                            this.props.onError();
                            return;
                        }
                    }}/>
            </div>
        );
    }
}