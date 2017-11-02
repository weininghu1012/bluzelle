import {getMessages} from 'services/MessageService'
import RowSelectDataGrid from 'components/RowSelectDataGrid'
import clone from 'lodash/clone'
import defaults from 'lodash/defaults'

@observer
class MessageListTabBody extends Component {

    rowGetter(idx) {
        const message = this.messages[idx];
        return defaults({body: JSON.stringify(message.body)}, message)
    }

    getColumns() {
        const filterMark = this.props.address ? '*' : '';
        return [{
            key: 'srcAddr',
            name: `${filterMark} Source Addr`,
            resizable: true,
            width: 150,
        }, {
            key: 'dstAddr',
            name: `${filterMark} Destination Addr`,
            resizable: true,
            width: 150,
        }, {
            key: 'body',
            name: 'Message',
            resizable: true,
        }];
    }

    render() {
        const {address} = this.props;
        this.messages = address ? (
            getMessages().filter(m => [m.srcAddr, m.dstAddr].includes(address))
        ) : (
            getMessages().map(clone)
        );

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

export default withParams(MessageListTabBody)


