import {RenderObject} from "./RenderObject";
import {isEmpty} from 'lodash';


export class JSONEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: props.obj
        };
    }

    update(obj) {
        merge(this.state.obj, obj);
        this.setState({ obj: this.state.obj });
    }

    render() {
        return <RenderObject obj={this.state.obj} update={this.update.bind(this)}/>;
    }
}


// Behaves like lodash merge but also deletes undefined
// values and
const merge = (obj1, obj2) => {
    const key = Object.keys(obj2)[0];

    if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {

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
};