import {getLocalDataStore} from "./DataService";
import {commandQueue, currentPosition, removePreviousHistory, updateHistoryMessage} from "./CommandQueueService";
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";
import {mapValues, extend, reduce} from 'lodash';

const toSerializable = v =>
    v === 'deleted' ? v : toPlainArray(v);

const toPlainArray = typedArr => Array.from(typedArr);

const commandsToSave = () =>
    commandQueue.slice(0, currentPosition.get() + 1);

const addChangesFromCommand = (changes, command) =>
    extend(changes, command.onSave(changes));

const generateChanges = () =>
    reduce(commandsToSave(), addChangesFromCommand, {});


const clearEditingData = changes => {
    const data = getLocalDataStore();
    Object.keys(changes).forEach(key => data.has(key) && data.get(key).clear());
};

export const save = () => {
    const changes = generateChanges();

    clearEditingData(changes);

    const serializableChanges = mapValues(changes, toSerializable);
    sendToNodes('sendChangesToNode', serializableChanges);

    removePreviousHistory();
    updateHistoryMessage(<span>Saved.</span>);
};