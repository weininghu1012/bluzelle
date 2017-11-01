import {getMessages} from 'services/MessageService'
import RowSelectDataGrid from 'components/RowSelectDataGrid'
import clone from 'lodash/clone'
import defaults from 'lodash/defaults'
import pipe from 'lodash/fp/pipe'

const MessageListTabBody = () => {
    const messages = getMessages().map(clone);

    return (
        <RowSelectDataGrid
            rowGetter={rowGetter}
            selectByKey="srcAddr"
            columns={columns}
            rows={messages}
            minColumnWidth={80}
        />
    )
};

const rowGetter = pipe(
    idx => getMessages()[idx],
    message => defaults({body: JSON.stringify(message.body)}, message)
);

export default observer(MessageListTabBody);

const columns = [{
    key: 'srcAddr',
    name: 'Source Addr',
    resizable: true,
    width: 150,
}, {
    key: 'dstAddr',
    name: 'Destination Addr',
    resizable: true,
    width: 150,
}, {
    key: 'body',
    name: 'Message',
    resizable: true,
}];
