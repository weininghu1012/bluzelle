import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";

console.log(Collapsible);
console.log(RenderTree);

export const RenderObject = ({json, update}) => (
    <Collapsible label={`{} (${Object.entries(json).length} entries)`}>
        {
            Object.entries(json).map(([key, value]) =>
                <div key={key}>
                    <span>{key}</span>:
                    <RenderTree
                        update={
                            obj => update({ [key]: obj })
                        }
                        json={value}/>
                </div>)
        }
    </Collapsible>
);