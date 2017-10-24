import {getNodes} from 'services/NodeService'
import 'src/ReactPre16Support'
import statusColors from 'constants/nodeStatusColors';

const ReactDataGrid = require('react-data-grid');

@observer
export default class NodeListTabBody extends Component {

    constructor() {
        super();
        this.state = {nodes: []};
    }

    rowGetter(i) {
        return this.state.nodes[i];
    }

    componentDidMount() {
        this.stop = autorun(() => {
            this.setState({nodes: getNodes().map(n => Object.assign( {}, n))})
        })
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.state.nodes.length}
                minHeight={500}
                minColumnWidth={80}
            />        )
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
