import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {EditableField} from './EditableField';
import {Deletable} from "./Deletable";

export class RenderTree extends Component {
    render() {
        const {obj, update} = this.props;

        // If object
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            return (
                <Deletable update={update}>
                    <RenderObject update={update} obj={obj}/>
                </Deletable>
            );
        }

        // If array
        if (Array.isArray(obj)) {
            return (
                <Deletable update={update}>
                    <RenderArray update={update} obj={obj}/>
                </Deletable>
            );
        }

        // Standard datatypes
        return (
            <Deletable update={update}>
                <EditableField
                    onChange={v => update(JSON.parse(v))}
                    val={JSON.stringify(obj)}
                    renderVal={v =>
                        <span style={{ color: colorFromType(v) }}>{v}</span>
                        }/>
            </Deletable>
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