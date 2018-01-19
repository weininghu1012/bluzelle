export class EditableField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: props.val,
            formActive: false
        };
    }

    handleChange(event) {
        this.setState({
            formValue: event.target.value
        });
    }

    handleSubmit(event) {

        const {onChange} = this.props;

        event.preventDefault();

        this.setState({
            formActive: false
        });

        onChange(this.state.formValue);
    }

    enableEditing() {
        this.setState({
            formActive: true
        });
    }

    render() {
        const {val, renderVal} = this.props;
        const renderValWithDefault = renderVal || (i => i);

        return (
            <span onClick={this.enableEditing.bind(this)}>
              {this.state.formActive ?
                  <form
                      style={{ display: 'inline' }}
                      onSubmit={this.handleSubmit.bind(this)}>
                      <input
                          type='text'
                          value={this.state.formValue}
                          onChange={this.handleChange.bind(this)}/>
                  </form>
                  : renderValWithDefault(val)}
            </span>
        );
    }
}