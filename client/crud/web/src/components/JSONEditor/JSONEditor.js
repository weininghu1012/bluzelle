import {RenderObject} from "./RenderObject";
import {merge} from './merge';

export class JSONEditor extends Component {
    constructor(props) {
        super(props);
        this.state = props.obj;
    }

    update(obj) {
        this.setState(merge(this.state, obj));
    }

    render() {
        return (
            <div style={{ fontFamily: 'monospace '}}>
                <RenderObject

                obj={this.state}
                update={this.update.bind(this)}
                noDelete={true}/>
            </div>);
    }
}