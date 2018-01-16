import './JSONEditor.css';


export class JSONEditor extends Component {
    render() {

        const {json} = this.props;

        // If object
        if (typeof json === 'object' && !Array.isArray(json)) {
            return <RenderObject json={json}/>;
        }

        // If array
        if (Array.isArray(json)) {
            return <RenderArray json={json}/>;
        }

        // Standard datatypes
        return <RenderField json={json}/>
    };
}


const TRIANGLE_RIGHT = '\u25b6';
const TRIANGLE_DOWN = '\u25bc';

class Collapsible extends Component {

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
            <div style={{ paddingLeft: 20 }}>
                <span onClick={() => this.toggleCollapse()}>
                    {this.collapseTriangle()} {label}
                </span>
                <div>
                    {this.state.collapsed || children}
                </div>
            </div>
        );
    }
}


const RenderObject = ({json}) => (
    <Collapsible label={`{} (${Object.entries(json).length} entries)`}>
        {
            Object.entries(json).map(([key, value]) =>
                <div key={key}>
                    <span>{key}</span>: <JSONEditor json={value}/>
                </div>)
        }
    </Collapsible>
);

const RenderArray = ({json}) => (
    <Collapsible label={`[] (${json.length} entries)`}>
        {
            json.map((value, index) =>
                <div key={index}>
                    <span>{index}</span>: <JSONEditor json={value}/>
                </div>)
        }
    </Collapsible>
);


class RenderField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: props.json.toString(),
            formActive: false
        };
    }

    handleChange(event) {
        this.setState({
            formValue: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            formActive: false
        });

        // Propagate change
    }

    enableEditing() {
        this.setState({
            formActive: true
        });
    }

    render() {
        const {json} = this.props;

        let color = colorFromType(json);

        return (
            <span style={{color}} onClick={this.enableEditing.bind(this)}>
              {this.state.formActive ?
                  <form onSubmit={this.handleSubmit.bind(this)}>
                      <input type='text' value={this.state.formValue} onChange={this.handleChange.bind(this)}/>
                  </form>
                  : json.toString()}
            </span>
        );
    }
};

const colorFromType = json => {
    let color;
    switch(typeof json) {
        case 'string':
            color = 'blue';
            break;

        case 'number':
            color = 'red';
            break;

        case 'boolean':
            color = 'purple';
            break;

        default:
            color = 'pink';
    }

    return color;
};