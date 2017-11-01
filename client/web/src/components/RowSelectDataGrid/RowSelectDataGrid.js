import 'src/ReactPre16Support'

import DataGrid from 'components/DataGrid';
import './data-grid.css';
import getProp from 'lodash/get'



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
        const {selectByKey, rowGetter, rows, ...props} = this.props;
        const {selectedRow} = this.state;
        return (
            <DataGrid
                {...props}
                rowGetter={this.rowGetter.bind(this)}
                rowSelection={{
                    selectBy: {keys: {rowKey: selectByKey, values: [getProp(selectedRow, selectByKey)]}},
                    showCheckbox: false
                }}
                onRowClick={(idx) => this.setState({selectedRow: this.rowGetter(idx)})}
            />
        )
    }
}
