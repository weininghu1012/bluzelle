import {addCommandProcessor} from "bluzelle-client-common/services/CommandService";
import {mapValues} from 'lodash';
import {removePreviousHistory, updateHistoryMessage} from './CommandQueueService';
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";

const data = observable.map({});

export const getLocalDataStore = () => data;
export const requestDataFromNode = () =>
    sendToNodes('requestDataFromNode');

const transformFromJSONToKeyData = arr => observable.map({
    bytearray: new Uint8Array(arr)
});

addCommandProcessor('sendFullDataToUI', updates => {
    data.clear();
    data.merge(mapValues(updates, transformFromJSONToKeyData));

    removePreviousHistory();
    updateHistoryMessage(<span>Downloaded.</span>);
});
