export class Delete extends Component {
    render() {
        const {update} = this.props;

        return (
            <button style={{
                    float: 'right',
                    border: 0,
                    background: 'none',
                    color: 'red'
                }}
                onClick={ () => update(undefined) }>
                X
            </button>
        );
    }
}