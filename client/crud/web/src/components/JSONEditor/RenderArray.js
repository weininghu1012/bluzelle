import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";

export const RenderArray = ({json, update}) => (
    <Collapsible label={`[] (${json.length} entries)`}>
        {
            json.map((value, index) =>
                <div key={index}>
                    <span>{index}</span>:
                    <RenderTree
                        update={
                            obj => update({ [index]: obj })
                        }
                        json={value}/>
                </div>)
        }
    </Collapsible>
);