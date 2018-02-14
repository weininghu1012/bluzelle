import {addCommandProcessor} from "bluzelle-client-common/services/CommandService";
import {mapValues} from 'lodash';

const data = observable.map({});

export const getSwarmData = () => data;


const transformFromJSONToKeyData = arr => observable.map({
    bytearray: new Uint8Array(arr)
});


addCommandProcessor('sendFullDataToUI', updates =>
    data.merge(mapValues(updates, transformFromJSONToKeyData)));