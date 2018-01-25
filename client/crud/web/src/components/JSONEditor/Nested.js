export class Nested extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
    }

    render() {
        const {children} = this.props;

        return (
            <div style={{
                    padding: 5,
                    paddingRight: 0,
                    background: this.state.hover ? '#F9F9F9' : '#FFFFFF'
                }}
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}>

                {React.cloneElement(children, { noButtons: !this.state.hover })}
            </div>
        );
    }
}