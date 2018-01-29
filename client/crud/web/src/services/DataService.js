import {observableMapRecursive} from "../mobXUtils";

const data = observableMapRecursive(testData());

export const getSwarmData = () => data;

global.data = data;

function testData() {
    return {
        key1: {
            array: [1, 2, 3, 4]
        }
    };
}