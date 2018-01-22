export class Deletable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hovering: false
        };
    }

    render() {
        const {children, update} = this.props;

        return (
            <span
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}>

                <button style={{
                    visibility: this.state.hovering ? 'visible' : 'hidden',
                    float: 'right',
                    borderRadius: '50%',
                    borderWidth: 1,
                    backgroundColor: '#8f1c18',
                    color: '#eaeaea'
                }} onClick={ () => update(undefined) }>X</button>
                { children }
            </span>
        );
    }
}