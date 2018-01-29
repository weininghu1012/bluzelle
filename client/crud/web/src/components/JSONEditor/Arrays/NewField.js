import {EditableField} from "../EditableField";
import {observableMapRecursive} from "../../../mobXUtils";

export const NewField = ({ arr, onEnd }) => (
    <div>
        {arr.length}:

        <EditableField
            active={true}
            val={''}
            onChange={val => {
                try {
                    const obj = observableMapRecursive(JSON.parse(val));
                    arr.push(obj);
                } catch(e) {}

                onEnd();
            }}/>
    </div>
);