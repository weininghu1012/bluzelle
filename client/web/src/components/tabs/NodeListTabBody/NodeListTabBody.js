import {getNodes} from 'services/NodeService'
import statusColors from 'constants/nodeStatusColors';
import DataGrid from 'components/DataGrid'
import clone from 'lodash/clone'

const NodeListTabBody = () => {
    const nodes = getNodes().map(n => clone);

    return (
        <DataGrid
            selectByKey="address"
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={nodes.length}
            minColumnWidth={80}
        />
    )
};

export default observer(NodeListTabBody);

const rowGetter = idx => {
    const node = getNodes()[idx];
    return {actionAddress: node.address, ...node};
};

const StatusFormatter = ({value}) => (
        <div>
            <svg style={{marginRight: 8}} width="15" height="15">
                <rect width="15" height="15" fill={statusColors[value]}/>
            </svg>
            {value}</div>
    );


const ActionFormatter = ({value}) => (
    <div>
        <LinkBtn to={`/message-list/filtered-by-address/${value}`}>Messages</LinkBtn>
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
