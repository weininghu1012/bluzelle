import {RenderTree} from "./Trees/RenderTree";
import {Hoverable} from "./Hoverable";
import 'bootstrap/dist/css/bootstrap.css';

export class JSONEditor extends Component {
    render() {

        const proxy = {
            get: () => this.props.obj,
            set: (key, val) => _
        };

        return (
            <div style={{ fontFamily: 'monospace '}}>
                <Hoverable>
                    <RenderTree
                        obj={proxy}
                        propName=''
                        isRoot={true}/>
                </Hoverable>
            </div>);
    }
}