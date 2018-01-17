import {RenderArray} from "./RenderArray";
import {RenderObject} from "./RenderObject";
import {RenderField} from "./RenderField";
import {Deletable} from "./Deletable";

export class RenderTree extends Component {
    render() {
        const {json, update} = this.props;

        // If object
        if (typeof json === 'object' && !Array.isArray(json)) {
            return (
                <Deletable update={update}>
                    <RenderObject update={update} json={json}/>
                </Deletable>
            );
        }

        // If array
        if (Array.isArray(json)) {
            return (
                <Deletable update={update}>
                    <RenderArray update={update} json={json}/>
                </Deletable>
            );
        }

        // Standard datatypes
        return (
            <Deletable update={update}>
                <RenderField update={update} json={json}/>
            </Deletable>
        );
    }
}