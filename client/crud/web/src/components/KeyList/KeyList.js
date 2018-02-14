import {enableExecution} from "../../services/CommandQueueService";
import {KeyListItem} from "./KeyListItem";
import {RemoveButton} from "./RemoveButton";
import {NewKeyField} from "./NewKeyField";
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";


export const selectedKey = observable(null);

@enableExecution
@observer
export class KeyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewKey: false
        };

        // TODO: make this better
        setTimeout(() => sendToNodes('requestKeyList'), 500);
    }

    render() {
        const {obj} = this.props;

        const keyList = obj.keys().sort().map(keyname =>
            <KeyListItem key={keyname} {...{keyname, obj}}/>);

        return (
            <div style={{padding: 10}}>
                <BS.ListGroup>
                    {keyList}
                    { this.state.showNewKey &&
                        <NewKeyField onChange={() => this.setState({showNewKey: false})} obj={obj}/> }
                </BS.ListGroup>
                <BS.ButtonGroup>
                    <AddButton onClick={() => this.setState({showNewKey: true})}/>
                    <RemoveButton obj={obj}/>
                </BS.ButtonGroup>
            </div>
        );
    }
}

const AddButton = ({onClick}) => (
    <BS.Button onClick={onClick} style={{color: 'green'}}>
        <BS.Glyphicon glyph='plus'/>
    </BS.Button>
);