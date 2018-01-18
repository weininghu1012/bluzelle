import {Collapsible} from "./Collapsible";
import {RenderTree} from "./RenderTree";

export const RenderObject = ({obj, update}) => (
    <Collapsible label={`{} (${Object.entries(obj).length} entries)`}>
        {
            Object.entries(obj).map(([key, value]) =>
                <div key={key}>
                    <span>{key}</span>:
                    <RenderTree
                        update={
                            obj => update({ [key]: obj })
                        }
                        obj={value}/>
                </div>)
        }


    </Collapsible>
);