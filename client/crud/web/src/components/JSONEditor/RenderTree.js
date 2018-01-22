import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {EditableField} from './EditableField';
import {Delete} from "./Delete";

export class RenderTree extends Component {
    render() {
        const {obj, update, preamble, noDelete} = this.props;

        // If object
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            return (
                <RenderObject {...this.props}/>
            );
        }

        // If array
        if (Array.isArray(obj)) {
            return (
                <RenderArray {...this.props}/>
            );
        }

        // Standard datatypes
        return (
            <div>
                {preamble && <span style={{ marginRight: 5 }}>{preamble}:</span>}
                <EditableField
                    onChange={v => update(JSON.parse(v))}
                    val={JSON.stringify(obj)}
                    renderVal={v =>
                        <span style={{ color: colorFromType(v) }}>{v}</span>
                        }/>
                { noDelete || <Delete update={update}/> }
            </div>
        );
    }
}


const colorFromType = obj => {
    let color;
    switch(typeof JSON.parse(obj)) {
        case 'string':
            color = 'blue';
            break;

        case 'number':
            color = 'red';
            break;

        case 'boolean':
            color = 'purple';
            break;

        default:
            color = 'pink';
    }

    return color;
};