import {getNodes} from 'services/NodeService'
import statusColors from 'constants/nodeStatusColors';
import DataGrid from 'components/DataGrid'
import clone from 'lodash/clone'
import getProp from 'lodash/get'

@observer
export default class NodeListTabBody extends Component {
    constructor() {
        super();
        this.state = {};
    }

    ensureSelectedNodeStillExists() {
        !this.state.selectedNode ||
        getNodes().some(node => node.address === this.state.selectedNode.address) ||
        this.setState({selectedNode: undefined});
    }

    componentWillUpdate() {
        this.ensureSelectedNodeStillExists();
    }

    render() {
        const nodes = getNodes().map(clone);
        const {selectedNode} = this.state;

        return (
            <DataGrid
                columns={columns}
                rowGetter={i => nodes[i]}
                rowsCount={nodes.length}
                minHeight={500}
                minColumnWidth={80}
                rowSelection={{
                    selectBy: {keys: {rowKey: 'address', values: [getProp(selectedNode, 'address')]}},
                    showCheckbox: false
                }}
                onRowClick={(idx) => this.setState({selectedNode: nodes[idx]})}

            />
        )
    }
}

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
