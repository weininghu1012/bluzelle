import {RenderTree} from "./RenderTree";
import {merge} from'lodash';

export class JSONEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: props.obj
        };
    }

    render() {
        return <RenderTree json={this.state.obj} update={obj => {
            this.setState({ obj: merge(this.state.obj, obj) });
        }}/>;
    }
}