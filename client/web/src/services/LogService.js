import {LocalDateTime, DateTimeFormatter} from 'js-joda'
import {addCommandProcessor} from "./CommunicationService";

const logEntries = observable([]);

addCommandProcessor('log', logEntries.push.bind(logEntries));

const dateFormatter = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm:ss")


export const getLogEntries = () => logEntries;

