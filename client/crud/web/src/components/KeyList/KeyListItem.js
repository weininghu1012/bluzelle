import {ObjIcon} from "../ObjIcon";
import {enableExecution} from "../../services/CommandQueueService";
import {EditableField} from "../EditableField";
import {selectedKey} from "./KeyList";
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";

@enableExecution
@observer
export class KeyListItem extends Component {

    select(target) {
        const oldVal = selectedKey.get();

        this.context.execute({
            doIt: () => selectedKey.set(target),
            undoIt: () => selectedKey.set(oldVal),
            message: <span>Selected <code key={1}>{target}</code>.</span>
        });
    }

    rename(newKey) {

        const {obj, keyname: keyName} = this.props;

        selectedKey.get() === keyName ? changeCurrentSelection.call(this) : changeNoncurrentSelection.call(this);


        function renameInObj(obj, oldKey, newKey) {
            obj.set(newKey, obj.get(oldKey));
            obj.delete(oldKey);
        }

        function onSave(savedKeys) {
            return {
                [newKey]: savedKeys[keyName] || obj.get(newKey).get('bytearray'),
                [keyName]: 'deleted'
            };
        }

        function message() {
            return <span>Renamed <code key={1}>{keyName}</code> to <code key={2}>{newKey}</code>.</span>;
        }


        function changeCurrentSelection() {
            this.context.execute({
                doIt: () => {
                    selectedKey.set(null);
                    renameInObj(obj, keyName, newKey);
                    selectedKey.set(newKey);
                },
                undoIt: () => {
                    selectedKey.set(null);
                    renameInObj(obj, newKey, keyName);
                    selectedKey.set(keyName);
                },
                onSave,
                message: message()
            });
        }

        function changeNoncurrentSelection() {
            this.context.execute({
                doIt: () => renameInObj(obj, keyName, newKey),
                undoIt: () => renameInObj(obj, newKey, keyName),
                onSave,
                message: message()
            });
        }

    }


    render() {

        const {obj, keyname} = this.props;

        return (
            <BS.ListGroupItem
                onClick={() => selectedKey.get() === keyname ? this.select(null) : this.select(keyname)}
                active={selectedKey.get() === keyname}

                // This line gives error?
                bsStyle={hasMoreRecentVersion(obj.get(keyname)) ? 'info' : null}
                >

                <span style={{display: 'inline-block', width: 25}}>
                    <ObjIcon keyData={obj.get(keyname)}/>
                </span>

                {
                    hasMoreRecentVersion(obj.get(keyname))
                        && <Refresh keyData={obj.get(keyname)}/>
                }

                <EditableField
                    val={keyname}
                    onChange={this.rename.bind(this)}/>

                {
                    keyname === selectedKey.get() ?
                        <BS.Glyphicon
                            style={{float: 'right'}}
                            glyph='chevron-right'/>
                        : null
                }
            </BS.ListGroupItem>);
    }
}

const hasMoreRecentVersion = keyData =>
    keyData.has('mostRecentTimestamp')
    && keyData.has('beginEditingTimestamp')
    && keyData.get('mostRecentTimestamp') > keyData.get('beginEditingTimestamp');





// 1. Set mostRecentTimestamp when saving

// 2. Move into own component

// 1.5 Isolate [Object object] bug.

// 3. Renaming bug


const Refresh = ({keyData}) => {
    return (
        <BS.OverlayTrigger placement="bottom" overlay={
            <BS.Tooltip id="refresh-tooltip">
                Began editing at: {new Date(keyData.get('beginEditingTimestamp')).toLocaleTimeString()}.
                <br/>
                Most recent version: {new Date(keyData.get('mostRecentTimestamp')).toLocaleTimeString()}.
            </BS.Tooltip>
        }>
            <div style={{
                display: 'inline-block',
                marginRight: 8
            }}>
                <BS.Glyphicon glyph='refresh'
                  onClick={(e) => {
                      e.stopPropagation();
                      keyData.clear();
                  }}
                  style={{
                    verticalAlign: 'middle'
                }}/>
            </div>
        </BS.OverlayTrigger>
    );
};