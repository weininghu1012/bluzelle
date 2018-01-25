import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";

export class NewArrayField extends Component {
    render() {
        const {preamble} = this.props;

        return (
            <div>
                {preamble}:

                <EditableField
                    active={true}
                    val={''}
                    onChange={val => {
                        try {
                            const obj = observableMapRecursive(JSON.parse(val));
                            this.props.onChange(obj);
                        } catch(e) {
                            this.props.onError();
                            return;
                        }
                    }}/>
            </div>
        );
    }
}