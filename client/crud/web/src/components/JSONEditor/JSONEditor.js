import {RenderObject} from "./RenderObject";
import {Nested} from "./Nested";

export class JSONEditor extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'monospace '}}>
                <Nested>
                    <RenderObject
                        obj={{ get: () => this.props.obj }}
                        propName=''
                        isRoot={true}/>
                </Nested>
            </div>);
    }
}