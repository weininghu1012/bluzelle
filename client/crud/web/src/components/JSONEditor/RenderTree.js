import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {RenderField} from "./RenderField";
import {Deletable} from "./Deletable";

export class RenderTree extends Component {
    render() {
        const {obj, update} = this.props;

        // If object
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            return (
                <Deletable update={update}>
                    <RenderObject update={update} obj={obj}/>
                </Deletable>
            );
        }

        // If array
        if (Array.isArray(obj)) {
            return (
                <Deletable update={update}>
                    <RenderArray update={update} obj={obj}/>
                </Deletable>
            );
        }

        // Standard datatypes
        return (
            <Deletable update={update}>
                <RenderField update={update} obj={obj}/>
            </Deletable>
        );
    }
}