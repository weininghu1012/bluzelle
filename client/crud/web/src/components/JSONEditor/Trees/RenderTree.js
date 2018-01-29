import {RenderArray} from "../Arrays/RenderArray";
import {RenderObject} from "../Objects/RenderObject";
import {RenderField} from "./RenderField";
import {get} from '../../../mobXUtils';
import {isObservableArray} from 'mobx';

@observer
export class RenderTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    render() {
        const {obj, propName, preamble, hovering} = this.props;

        // If array
        if (!this.state.editing && isObservableArray(get(obj, propName))) {
            return (
                <RenderArray
                    {...this.props}
                    onEdit={() => this.setState({ editing: true })}/>
            );
        }

        // If object
        if (!this.state.editing && typeof get(obj, propName) === 'object') {
            return (
                <RenderObject
                    {...this.props}
                    onEdit={() => this.setState({ editing: true })}/>
            );
        }

        // Standard datatypes
        return (
            <RenderField
                {...this.props}
                editing={this.state.editing}
                onChange={() => this.setState({ editing: false })}/>
        );
    }
}