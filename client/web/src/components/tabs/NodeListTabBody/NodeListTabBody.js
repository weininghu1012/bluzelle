import {getNodes} from 'services/NodeService'
import 'src/ReactPre16Support'
import statusColors from 'constants/nodeStatusColors';
import clone from 'lodash/clone'
const ReactDataGrid = require('react-data-grid');

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
        <div><span style={{display: 'inline-block', backgroundColor: statusColors[value], height: 15, width: 15}}/> {value}</div>
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
