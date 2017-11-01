import {getNodes} from 'services/NodeService'
import statusColors from 'constants/nodeStatusColors';
import RowSelectDataGrid from 'components/RowSelectDataGrid'
import clone from 'lodash/clone'

const NodeListTabBody = () => {
    const nodes = getNodes().map(clone);

    return (
        <RowSelectDataGrid
            selectByKey="address"
            columns={columns}
            rows={nodes}
            rowsCount={nodes.length}
            minColumnWidth={80}
        />
    )
};

export default observer(NodeListTabBody);

const StatusFormatter = ({value}) => {
    return (
        <div>
            <svg style={{marginRight: 8}} width="15" height="15">
                <rect width="15" height="15" fill={statusColors[value]}/>
            </svg>
            {value}</div>
    )
};

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
    key: 'messages',
    name: 'Messages',
    resizable: true,
}];
