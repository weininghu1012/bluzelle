import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";
import {Delete} from "./Delete";
import {Nested} from "./Nested";
import {get, del} from '../../mobXUtils';


@observer
export class RenderObject extends Component {
    render() {
        const {obj, propName, preamble, noDelete} = this.props;

        return (<Collapsible
            label={`{} (${get(obj, propName).keys().length} entries)`}
            buttons={
                <React.Fragment>
                    <NewField
                        obj={get(obj, propName)}
                        propName={keynameNotInObject('key', propName, '+')}/>
                    {noDelete || <Delete onClick={() => del(obj, propName)}/>}
                </React.Fragment>
            }
            preamble={preamble}>
            {
                get(obj, propName).keys().map(subkey =>
                    <Nested key={subkey}>
                        <RenderTree
                            obj={get(obj, propName)}
                            propName={subkey}
                            preamble={
                                <EditableField
                                    val={subkey}
                                    onChange={newkey => {
                                        const subobj = get(obj, propName),
                                              oldval = subobj.get(subkey);

                                        subobj.delete(subkey);
                                        subobj.set(newkey, oldval);
                                    }}/>
                            }/>
                    </Nested>)
            }
        </Collapsible>);
    }
}

const NewField = ({ obj, propName }) => (
    <button
        onClick={() => obj.set(propName, 'default')}
        style={{
            border: 0,
            background: 'none',
            color: 'green'
        }}>
        +
    </button>
);

const keynameNotInObject = (keyname, object, appendage) =>
    object[keyname] === undefined
        ? keyname
        : keynameNotInObject(keyname + appendage, object, appendage);