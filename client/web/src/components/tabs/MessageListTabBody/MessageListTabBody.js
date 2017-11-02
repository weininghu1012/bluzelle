import {getMessages} from 'services/MessageService'
import RowSelectDataGrid from 'components/RowSelectDataGrid'
import clone from 'lodash/clone'
import defaults from 'lodash/defaults'

@observer
export default class MessageListTabBody extends Component {

    rowGetter(idx) {
        const message = this.messages[idx];
        return defaults({body: JSON.stringify(message.body)}, message)
    }

    getColumns() {
        return [{
            key: 'srcAddr',
            name: `Source Addr`,
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
        }]
    }

    render() {
        const {address} = this.props.match.params;
        this.messages = address ? getMessages().filter(m => [m.srcAddr, m.dstAddr].includes(address)) : getMessages().map(clone);

        return (
            <RowSelectDataGrid
                selectByKey="srcAddr"
                columns={this.getColumns()}
                rows={this.messages}
                rowGetter={this.rowGetter.bind(this)}
            />
        )
    }
}

