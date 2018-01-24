import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {EditableField} from './EditableField';
import {Delete} from "./Delete";
import {observableMapRecursive, get, del} from '../../mobXUtils';
import {isObservableArray} from 'mobx';

@observer
export class RenderTree extends Component {
    render() {
        const {obj, propName, preamble, noDelete} = this.props;

        // If array
        if (isObservableArray(get(obj, propName))) {
            return (
                <RenderArray {...this.props}/>
            );
        }

        // If object
        if (typeof get(obj, propName) === 'object') {
            return (
                <RenderObject {...this.props}/>
            );
        }

        // Standard datatypes
        return (
            <div>
                {preamble && <span style={{ marginRight: 5 }}>{preamble}:</span>}
                <EditableField
                    onChange={v =>
                        obj.set(propName, observableMapRecursive(JSON.parse(v)))}
                    val={JSON.stringify(get(obj, propName))}
                    renderVal={v =>
                        <span style={{ color: colorFromType(v) }}>{v}</span> }/>
                { noDelete || <Delete onClick={ () => del(obj, propName) }/> }
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