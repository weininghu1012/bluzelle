import {RenderObject} from "./RenderObject";

export class JSONEditor extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'monospace '}}>
                <RenderObject
                    obj={{ get: () => this.props.obj }}
                    propName='root'
                    noDelete={true}/>
            </div>);
    }
}