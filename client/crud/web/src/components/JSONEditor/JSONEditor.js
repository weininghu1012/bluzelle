import {RenderObject} from "./RenderObject";
import {isEmpty} from 'lodash';


export class JSONEditor extends Component {
    constructor(props) {
        super(props);
        this.state = props.obj;
    }

    update(obj) {
        this.setState(merge(this.state, obj));
    }

    render() {
        return <RenderObject obj={this.state} update={this.update.bind(this)}/>;
    }
}


// Behaves like lodash merge but also deletes undefined values from
// objects and splices undefined values out of arrays.
const merge = (obj1, obj2) => {
    const key = Object.keys(obj2)[0];

    if(!isMinimal(obj1[key], obj2[key])) {

        merge(obj1[key], obj2[key]);

    } else {

        if(obj2[key] === undefined) {

            if(Array.isArray(obj1)) {
                obj1.splice(key, 1);
            } else {
                delete obj1[key];
            }

        } else {
            obj1[key] = obj2[key];
        }
    }

    return obj1;
};


