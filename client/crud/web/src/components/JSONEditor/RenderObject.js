import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";

export const RenderObject = ({obj, update}) => (
    <Collapsible
        label={`{} (${Object.entries(obj).length} entries)`}
        button={<NewField update={update}/>}>

        {
            Object.entries(obj).map(([key, value]) =>
                <div key={key}>

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

const NewField = ({ update }) => (
    <button onClick={ () => update({ newkey: "default" }) }>+</button>
);
