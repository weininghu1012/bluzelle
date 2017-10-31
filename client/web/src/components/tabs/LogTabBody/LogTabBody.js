import {getLogEntries} from 'services/LogService'
import 'src/ReactPre16Support'
const ReactDataGrid = require('react-data-grid');

@observer
export default class LogTabBody extends Component {

    constructor() {
        super();
        this.state = {
            gridHeight: 100
        };
        this.resizeGrid = () => this.setState({gridHeight: this.wrapper.clientHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeGrid);
        this.resizeGrid();
        this.canvas = this.grid.getDataGridDOMNode().querySelector('.react-grid-Canvas');
    }

    componentWillUpdate() {
        this.isAtBottom = this.canvas.scrollHeight - this.canvas.scrollTop === this.canvas.clientHeight;
    }

    componentDidUpdate() {
        this.isAtBottom && (this.canvas.scrollTop = this.canvas.querySelector('div').clientHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeGrid);
    }


    render() {
        const logEntries = getLogEntries();
        const {gridHeight} = this.state;
        return (
            <div ref={r => this.wrapper = r} style={{height: '100%'}}>
                <ReactDataGrid
                    ref={r => this.grid = r}
                    columns={columns}
                    rowGetter={i => logEntries[i]}
                    rowsCount={logEntries.length}
                    minHeight={gridHeight}
                    minColumnWidth={120}
                />
            </div>
        )
    }
}

const columns = [{
    key: 'timer_no',
    name: 'Timer loop #',
    resizable: true,
    width: 100
}, {
    key: 'entry_no',
    name: 'Entry #',
    resizable: true,
    width: 100
}, {
    key: 'timestamp',
    name: 'Timestamp',
    resizable: true,
    width: 150
}, {
    key: 'message',
    name: 'Message',
    resizable: true
}];

