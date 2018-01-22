import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";
import {Delete} from "./Delete";
import {Nested} from "./Nested";

export const RenderObject = ({obj, update, preamble, noDelete}) => (
    <Collapsible
        label={`{} (${Object.entries(obj).length} entries)`}
        buttons={
            <React.Fragment>
                <NewField
                    update={update}
                    keyname={keynameNotInObject('key', obj, '+')}/>
                { noDelete || <Delete update={update}/> }
            </React.Fragment>
        }
        preamble={preamble}>
        {
            Object.entries(obj).map(([key, value]) =>
                <Nested key={key}>
                    <RenderTree
                        update={obj => update({ [key]: obj })}
                        obj={value}
                        preamble={
                            <EditableField
                                val={key}
                                onChange={newkey => {
                                    update({ [key]: undefined });
                                    update({ [newkey]: value });
                                }}/>
                        }/>
                </Nested>)
        }
    </Collapsible>
);


const NewField = ({ update, keyname }) => (
    <button
        onClick={ () => update({ [keyname]: "default" }) }
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