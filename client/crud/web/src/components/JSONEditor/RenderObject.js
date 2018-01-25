import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";
import {Plus, Edit, Delete} from "./Buttons";
import {Hoverable} from './Hoverable.js';
import {get, del} from '../../mobXUtils';


@observer
export class RenderObject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewField: false
        };
    }

    render() {
        const {obj, propName, preamble, hovering, onEdit, isRoot} = this.props;

        const buttons = hovering &&
            <React.Fragment>
                <Plus onClick={() => this.setState({showNewField: true})}/>
                {isRoot ||
                    <React.Fragment>
                        <Delete onClick={() => del(obj, propName)}/>
                        <Edit onClick={onEdit}/>
                    </React.Fragment>
                }
            </React.Fragment>;


        const newField = this.state.showNewField &&
            <Hoverable>
                <NewField
                    onChange={(key, val) => {
                        this.setState({showNewField: false});
                        get(obj, propName).set(key, val);
                    }}
                    onError={() => this.setState({showNewField: false})}/>
            </Hoverable>;


        const fieldList = get(obj, propName).keys().sort().map(subkey =>
            <Hoverable key={subkey}>
                <RenderTreeWithEditableKey
                    obj={get(obj, propName)}
                    propName={subkey}/>
            </Hoverable>);


        return (
            <Collapsible
                label={`{} (${get(obj, propName).keys().length} entries)`}
                buttons={buttons}
                preamble={preamble}>

                {newField}
                {fieldList}
            </Collapsible>
        );
    }
}


const RenderTreeWithEditableKey = ({obj, propName, ...props}) => {
    const preamble =
        <EditableField
            val={propName}
            renderVal={val => <span style={{color: 'navy'}}>{val}</span>}
            onChange={newkey => {
                const oldval = obj.get(propName);
                obj.delete(propName);
                obj.set(newkey, oldval);
            }}/>;

    return <RenderTree
        obj={obj}
        propName={propName}
        preamble={preamble}
        {...props}/>;
};


class NewField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentInput: 'key',
            key: 'key'
        };
    }

    render() {
        const {onChange, onError} = this.props;

        const keyField =
            <EditableField
                active={this.state.currentInput === 'key'}
                val={this.state.key}
                onChange={key => {
                    this.setState({ currentInput: 'val', key });
                }}/>;

        const valField =
            <EditableField
                active={this.state.currentInput === 'val'}
                val={'"value"'}
                onChange={val => {
                    try {
                        const obj = observableMapRecursive(JSON.parse(val));
                        onChange(this.state.key, obj);
                    } catch(e) {
                        onError();
                        return;
                    }
                }}/>;

        return (
            <div>
                {keyField}:{valField}
            </div>
        );
    }
}