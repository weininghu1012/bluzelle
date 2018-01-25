import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";
import {Plus, Edit, Delete} from "./Buttons";
import {Nested} from "./Nested";
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
        const {obj, propName, preamble, noButtons, onEdit, isRoot} = this.props;

        const buttons = noButtons ||
            <React.Fragment>
                <Plus onClick={() => this.setState({showNewField: true})}/>
                {isRoot ||
                    <React.Fragment>
                        <Delete onClick={() => del(obj, propName)}/>
                        <Edit onClick={onEdit}/>
                    </React.Fragment>
                }
            </React.Fragment>;

        return (<Collapsible
            label={`{} (${get(obj, propName).keys().length} entries)`}
            buttons={buttons}
            preamble={preamble}>

            {
                this.state.showNewField &&
                <Nested>
                    <NewField
                        onChange={(key, val) => {
                            this.setState({showNewField: false});
                            get(obj, propName).set(key, val);
                        }}
                        onError={() => this.setState({showNewField: false})}/>
                </Nested>
            }

            {
                get(obj, propName).keys().sort().map(subkey =>
                    <Nested key={subkey}>
                        <RenderTree
                            obj={get(obj, propName)}
                            propName={subkey}
                            preamble={
                                <EditableField
                                    val={subkey}
                                    renderVal={val => <span style={{color: 'navy'}}>{val}</span>}
                                    onChange={newkey => {
                                        const subobj = get(obj, propName),
                                            oldval = subobj.get(subkey);

                                        subobj.delete(subkey);
                                        subobj.set(newkey, oldval);
                                    }}/>
                            }/>
                    </Nested>)
            }
        </Collapsible>)
    }
}


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
                    val={''}
                    onChange={val => {
                        try {
                            const obj = observableMapRecursive(JSON.parse(val));
                            onChange(this.state.key, obj);
                        } catch(e) {
                            onError();
                            return;
                        }
                    }}/>
            </div>
        );
    }
}