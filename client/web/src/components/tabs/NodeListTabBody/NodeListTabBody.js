import {getNodes} from 'services/NodeService'
import 'src/ReactPre16Support'
import statusColors from 'constants/nodeStatusColors';
const ReactDataGrid = require('react-data-grid');
import clone from 'lodash/clone'

@observer
export default class NodeListTabBody extends Component {

    render() {
        const nodes = getNodes().map(clone);

        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={i => nodes[i]}
                rowsCount={nodes.length}
                minHeight={500}
                minColumnWidth={80}
            />
        )
    }
}

const StatusFormatter = ({value}) => {
    return (
        <div><svg style={{marginRight: 8}} width="15" height="15"><rect width="15" height="15" fill={statusColors[value]}/></svg> {value}</div>
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
