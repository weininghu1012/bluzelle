import {getNodes} from 'services/NodeService'
import statusColors from 'constants/nodeStatusColors';
import DataGrid from 'components/DataGrid'
import {strafeObject} from 'src/Utils'



@observer
export default class NodeListTabBody extends Component {

    rowGetter(idx) {
        const node = this.nodes[idx];
        return {actionAddress: node.address, ...node};
    }

    render() {
        this.nodes = getNodes().map(strafeObject);
        return (
            <DataGrid
                selectByKey="address"
                columns={columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.nodes.length}
                minColumnWidth={80}
            />
        )
    }
}

const StatusFormatter = ({value}) => (
    <div>
        <svg style={{marginRight: 8}} width="15" height="15">
            <rect width="15" height="15" fill={statusColors[value]}/>
        </svg>
        {value}
    </div>
);


const ActionFormatter = ({value:address}) => (
    <div>
        <LinkBtn to={`/message-list/filtered-by-address/${address}`}>Messages</LinkBtn>
    </div>
);

const columns = [{
    key: 'address',
    name: 'Address',
    resizable: true,
    width: 150,
}, {
    key: 'nodeState',
    name: 'Status',
    resizable: true,
    width: 100,
    formatter: StatusFormatter,
}, {
    key: 'actionAddress',
    name: 'Actions',
    resizable: true,
    formatter: ActionFormatter
}];
