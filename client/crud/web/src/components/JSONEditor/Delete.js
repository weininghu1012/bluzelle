export class Delete extends Component {
    render() {
        const {onClick} = this.props;

        return (
            <button style={{
                    float: 'right',
                    border: 0,
                    background: 'none',
                    color: 'red'
                }}
                onClick={ onClick }>
                X
            </button>
        );
    }
}