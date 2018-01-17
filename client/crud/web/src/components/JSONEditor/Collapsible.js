const TRIANGLE_RIGHT = '\u25b6';
const TRIANGLE_DOWN = '\u25bc';

export class Collapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: props.collapsed || false};
    }

    toggleCollapse() {
        this.setState({collapsed: !this.state.collapsed});
    }

    collapseTriangle() {
        return this.state.collapsed ? TRIANGLE_RIGHT : TRIANGLE_DOWN;
    }

    render() {

        const {children, label} = this.props;

        return (
            <React.Fragment>
                <span onClick={() => this.toggleCollapse()}>
                    {this.collapseTriangle()} {label}
                </span>
                <div style={{ paddingLeft: 20 }}>
                    {this.state.collapsed || children}
                </div>
            </React.Fragment>
        );
    }
}