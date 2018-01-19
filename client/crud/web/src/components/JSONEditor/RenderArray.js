import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";

export const RenderArray = ({obj, update}) => (
    <Collapsible
        label={`[] (${obj.length} entries)`}
        button={<NewField update={update} obj={obj}/>}>
        {
            obj.map((value, index) =>
                <div key={index}>
                    <span>{index}</span>:
                    <RenderTree
                        update={
                            obj => update({ [index]: obj })
                        }
                        obj={value}/>
                </div>)
        }
    </Collapsible>
);

const NewField = ({ obj, update }) => (
    <button onClick={ () => update({ [obj.length]: "default" }) }>+</button>
);