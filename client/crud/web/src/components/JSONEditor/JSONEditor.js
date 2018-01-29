import {RenderObject} from "./RenderObject";
import {Hoverable} from "./Hoverable";
import 'bootstrap/dist/css/bootstrap.css';

export class JSONEditor extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'monospace '}}>
                <Hoverable>
                    <RenderObject
                        obj={{ get: () => this.props.obj }}
                        propName=''
                        isRoot={true}/>
                </Hoverable>
            </div>);
    }
}