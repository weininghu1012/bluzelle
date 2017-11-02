import 'src/ReactPre16Support'
import DataGrid from 'components/DataGrid';
import getProp from 'lodash/get'
import './row-select-grid.css'


export default class RowSelectDataGrid extends Component {

    constructor() {
        super();
        this.state = {}
    }

    ensureSelectedRowStillExists() {
        const {selectByKey} = this.props;
        !this.state.selectedRow ||
        this.props.rows.some(row => row[selectByKey] === this.state.selectedRow[selectByKey]) ||
        this.setState({selectedRow: undefined});
    }

    rowGetter(idx) {
        return this.props.rows[idx];
    }

    componentWillUpdate() {
        this.ensureSelectedRowStillExists();
    }

    render() {
        const {selectByKey, rowGetter = this.rowGetter.bind(this), rows, ...props} = this.props;
        const {selectedRow} = this.state;
        return (
            <DataGrid
                {...props}
                rowsCount ={rows.length}
                rowGetter={rowGetter}
                rowSelection={{
                    selectBy: {keys: {rowKey: selectByKey, values: [getProp(selectedRow, selectByKey)]}},
                    showCheckbox: false
                }}
                onRowClick={(idx) => this.setState({selectedRow: this.rowGetter(idx)})}
            />
        )
    }
}
