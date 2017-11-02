import {getMessages} from 'services/MessageService'
import RowSelectDataGrid from 'components/RowSelectDataGrid'
import clone from 'lodash/clone'
import defaults from 'lodash/defaults'
import pipe from 'lodash/fp/pipe'

@observer
export default class MessageListTabBody extends Component {

    rowGetter(idx) {
        const message = this.messages[idx];
        console.log('xxxx', message);
    return defaults({body: JSON.stringify(message.body)}, message)
}
    render() {
        const {address} = this.props.match.params;
        this.messages = address ? getMessages().filter(m => console.log([m.srcAddr, m.dstAddr].includes(address), address, m.srcAddr, m.dstAddr) || [m.srcAddr, m.dstAddr].includes(address)) : getMessages().map(clone);

        return (
            <RowSelectDataGrid
                selectByKey="srcAddr"
                columns={columns}
                rows={this.messages}
                rowGetter={this.rowGetter.bind(this)}
            />
        )
    }
}

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
