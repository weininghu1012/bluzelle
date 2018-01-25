import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";
import {Plus, Edit, Delete} from "./Buttons";
import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";
import {Nested} from "./Nested";
import {get, del} from '../../mobXUtils';

@observer
export class RenderArray extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewField: false
        };
    }

    render() {
        const {obj, propName, preamble, noButtons, onEdit} = this.props;

        const buttons = noButtons ||
            <React.Fragment>
                <Plus onClick={() => this.setState({ showNewField: true })}/>
                <Delete onClick={() => del(obj, propName)}/>
                <Edit onClick={onEdit}/>
            </React.Fragment>;

        return <Collapsible
            label={`[] (${get(obj, propName).length} entries)`}
            buttons={buttons}
            preamble={preamble}>

            {
                get(obj, propName).map((value, index) =>
                    <Nested key={index}>
                        <RenderTree
                            obj={get(obj, propName)}
                            propName={index}
                            preamble={<span>{index}</span>}/>
                    </Nested>)
            }
            {
                this.state.showNewField &&
                    <NewField
                        arr={get(obj, propName)}
                        onEnd={() => this.setState({ showNewField: false })}/>
            }
        </Collapsible>;
    }
}

const NewField = ({ arr, onEnd }) => (
    <Nested>
        <div>
            {arr.length}:

            <EditableField
                active={true}
                val={''}
                onChange={val => {
                    try {
                        const obj = observableMapRecursive(JSON.parse(val));
                        arr.push(obj);
                    } catch(e) {}

                    onEnd();
                }}/>
        </div>
    </Nested>
);