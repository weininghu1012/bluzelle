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
        const {children, label, buttons, preamble} = this.props;

        return (
            <React.Fragment>
                <div>
                    {preamble && <span style={{ marginRight: 5 }}>{preamble}:</span>}
                    <span onClick={() => this.toggleCollapse()}>
                        {this.collapseTriangle()} {label}
                    </span>
                    {buttons}
                </div>
                <div style={{
                    paddingLeft: 20,
                    background: 'white',
                    borderLeft: '1px solid #CCCCCC'
                }}>
                    {this.state.collapsed || children}
                </div>
            </React.Fragment>
        );
    }
}