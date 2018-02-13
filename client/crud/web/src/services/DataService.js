import {objectToKeyData} from '../components/JSONEditor/JSONEditor';
import {textToKeyData} from "../components/PlainTextEditor";
import {observableMapRecursive} from "../util/mobXUtils";
import {addCommandProcessor} from "bluzelle-client-common/services/CommandService";
import {mapValues} from 'lodash';

const data = observable.map({});

export const getSwarmData = () => data;


const transformToKeyData = arr => observable.map({
    bytearray: new Uint8Array(arr)
});

addCommandProcessor('updateData', updates => {
    data.merge(mapValues(updates, transformToKeyData));

    console.log('New data from emulator. New data: ', data);
});