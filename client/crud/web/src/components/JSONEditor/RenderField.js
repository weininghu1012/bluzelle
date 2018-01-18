export class RenderField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: JSON.stringify(props.obj),
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


        // Do error handling here
        let val = JSON.parse(this.state.formValue);

        // Propagate change to root
        this.props.update(val);
    }

    enableEditing() {
        this.setState({
            formActive: true
        });
    }

    render() {
        const {obj} = this.props;

        let color = colorFromType(obj);

        return (
            <span style={{color}} onClick={this.enableEditing.bind(this)}>
              {this.state.formActive ?
                  <form
                      style={{ display: 'inline' }}
                      onSubmit={this.handleSubmit.bind(this)}>
                      <input
                          type='text'
                          value={this.state.formValue}
                          onChange={this.handleChange.bind(this)}/>
                  </form>
                  : JSON.stringify(obj)}
            </span>
        );
    }
}

const colorFromType = obj => {
    let color;
    switch(typeof obj) {
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