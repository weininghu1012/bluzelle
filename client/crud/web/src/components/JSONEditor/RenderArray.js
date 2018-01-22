import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";
import {Delete} from "./Delete";
import {Nested} from "./Nested";

export const RenderArray = ({obj, update, noDelete}) => (
    <Collapsible
        label={`[] (${obj.length} entries)`}
        buttons={
            <React.Fragment>
                <NewField update={update} obj={obj}/>
                { noDelete || <Delete update={update}/> }
            </React.Fragment>
        }>
        {
            obj.map((value, index) =>
                <Nested key={index}>
                    <RenderTree
                        update={obj => update({ [index]: obj })}
                        obj={value}
                        preamble={<span>{index}</span>}/>
                </Nested>)
        }
    </Collapsible>
);

const NewField = ({ obj, update }) => (
    <button
        onClick={ () => update({ [obj.length]: "default" }) }
        style={{
            border: 0,
            background: 'none',
            color: 'green'
        }}>
        +
    </button>
);