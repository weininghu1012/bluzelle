import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";

export const RenderObject = ({obj, update}) => (
    <Collapsible
        label={`{} (${Object.entries(obj).length} entries)`}
        button={<NewField
            update={update}
            keyname={keynameNotInObject('key', obj, '+')}/>}>

        {
            Object.entries(obj).map(([key, value]) =>
                <div
                    style={{
                        paddingTop: 5,
                        paddingLeft: 5
                    }}
                    key={key}>

                    <EditableField
                        val={key}
                        onChange={(newkey) => {
                            update({ [key]: undefined });
                            update({ [newkey]: value });
                        }}/>:

                    <RenderTree
                        update={
                            obj => update({ [key]: obj })
                        }
                        obj={value}/>
                </div>)
        }
    </Collapsible>
);


const NewField = ({ update, keyname }) => (
    <button
        onClick={ () => update({ [keyname]: "default" }) }
        style={{
            borderRadius: '50%',
            marginLeft: 5,
            borderWidth: 2,
            backgroundColor: '#7effa0'
        }}>
        +
    </button>
);

const keynameNotInObject = (keyname, object, appendage) =>
    object[keyname] === undefined
        ? keyname
        : keynameNotInObject(keyname + appendage, object, appendage);