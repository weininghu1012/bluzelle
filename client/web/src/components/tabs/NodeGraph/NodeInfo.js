const NodeInfo = ({node}) => (
    <table style={styles.infoBox}>
        <tbody>
        <tr>
            <th style={styles.tableCell}>Address</th>
            <td style={styles.tableCell}>{node.address}</td>
        </tr>
        <tr>
            <th style={styles.tableCell}>Messages</th>
            <td style={styles.tableCell}>{node.messages}</td>
        </tr>
        <tr>
            <th style={styles.tableCell}>Status</th>
            <td style={styles.tableCell}>{node.nodeState}</td>
        </tr>
        </tbody>
    </table>
);

const styles = {
    tableCell: {
        padding: 5
    },
    infoBox: {
        width: 200,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid black'
    }
}

export default NodeInfo