import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {EditableField} from './EditableField';
import {Delete} from "./Buttons";
import {observableMapRecursive, get, del} from '../../mobXUtils';
import {isObservableArray} from 'mobx';

@observer
export class RenderTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    render() {
        const {obj, propName, preamble, hovering} = this.props;

        // If array
        if (!this.state.editing && isObservableArray(get(obj, propName))) {
            return (
                <RenderArray
                    {...this.props}
                    onEdit={() => this.setState({ editing: true })}/>
            );
        }

        // If object
        if (!this.state.editing && typeof get(obj, propName) === 'object') {
            return (
                <RenderObject
                    {...this.props}
                    onEdit={() => this.setState({ editing: true })}/>
            );
        }

        // Standard datatypes
        return (
            <div>
                {preamble && <span style={{ marginRight: 5 }}>{preamble}:</span>}
                <EditableField
                    active={this.state.editing}
                    onChange={v => {
                        this.setState({ editing: false });
                        obj.set(propName, observableMapRecursive(JSON.parse(v)));
                    }}
                    val={JSON.stringify(get(obj, propName))}
                    renderVal={v =>
                        <span style={{ color: colorFromType(v) }}>{v}</span> }/>
                { hovering && <Delete onClick={ () => del(obj, propName) }/> }
            </div>
        );
    }
}

const colorTypeMap = {
    string: 'blue',
    number: 'red',
    boolean: 'purple'
};

const colorFromType = obj =>
    colorTypeMap[typeof JSON.parse(obj)] || 'pink';