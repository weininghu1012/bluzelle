import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";
import {Plus, Edit, Delete} from "./Buttons";
import {EditableField} from "./EditableField";
import {observableMapRecursive} from "../../mobXUtils";
import {Hoverable} from "./Hoverable";
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
        const {obj, propName, preamble, hovering, onEdit} = this.props;

        const buttons = hovering &&
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
                    <Hoverable key={index}>
                        <RenderTree
                            obj={get(obj, propName)}
                            propName={index}
                            preamble={<span>{index}</span>}/>
                    </Hoverable>)
            }
            {
                this.state.showNewField &&
                    <Hoverable>
                        <NewField
                            arr={get(obj, propName)}
                            onEnd={() => this.setState({ showNewField: false })}/>
                    </Hoverable>
            }
        </Collapsible>;
    }
}

const NewField = ({ arr, onEnd }) => (
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
);