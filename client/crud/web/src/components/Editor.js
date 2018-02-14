import {getPrefix} from "./keyData";
import {JSONEditor, PREFIX as jsonPrefix} from "./JSONEditor";
import {PlainTextEditor, PREFIX as textPrefix} from './PlainTextEditor';
import {selectedKey} from "./KeyList";
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";


// This component chooses the correct rendering component based
// on data type.


export const Editor = observer(({obj}) => {

    const keyData = obj.get(selectedKey.get());

    if(!keyData.has('bytearray')) {
        sendToNodes('requestBytearray', {key: selectedKey.get()});
        return (
            <div>
                Fetching data...
            </div>
        );
    }


    const type = getPrefix(keyData);

    return (
        <React.Fragment>
            { type === jsonPrefix && <JSONEditor keyData={keyData} keyName={selectedKey.get()}/> }
            { type === textPrefix && <PlainTextEditor keyData={keyData} keyName={selectedKey.get()} key={selectedKey.get()}/> }
        </React.Fragment>
    );
});