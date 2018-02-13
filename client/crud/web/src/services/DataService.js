import {objectToKeyData} from '../components/JSONEditor/JSONEditor';
import {textToKeyData} from "../components/PlainTextEditor";
import {observableMapRecursive} from "../util/mobXUtils";
import {addCommandProcessor} from "bluzelle-client-common/services/CommandService";
import {mapValues} from 'lodash';

const data = observableMapRecursive({

    key1: objectToKeyData({
        array: [1, 2, 3, 4]
    }),

    anotherKey: objectToKeyData({
        fieldA: 1.23,
        fieldB: 4.56,
        bool: true,
        crazyObject: {
            "true": false
        }
    }),

    complexObject: objectToKeyData({
        arrays: [1, 2, [{field: "feild"}, []], 3, ["apples", ["and", ["oranges"]]]]
    }),

    someText: textToKeyData("Hello world, this is some plain text.")
});

export const getSwarmData = () => data;


const transformToKeyData = arr => observable.map({
    bytearray: new Uint8Array(arr)
});

addCommandProcessor('updateData', updates => {
    data.merge(mapValues(updates, transformToKeyData));

    console.log('New data from emulator. New data: ', data);
});