import {Form, FormGroup} from 'react-bootstrap';
import {SelectedInput} from "./SelectedInput";

export class EditableField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: props.val,
            formActive: false,
            hovering: false
        };
    }

    componentWillMount() {
        this.props.active && this.enableEditing();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.active && this.enableEditing();
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
            formActive: true,
            hovering: false
        });
    }


    render() {
        const {val, renderVal} = this.props;
        const renderValWithDefault = renderVal || (i => i);

        return (
            <span onClick={this.enableEditing.bind(this)}>
              {this.state.formActive ?
                  <Form inline
                        style={{display: 'inline'}}
                        onSubmit={this.handleSubmit.bind(this)}>
                      <FormGroup
                          controlId='JSONForm'
                          validationState='success'>
                          <SelectedInput
                              type='text'
                              value={this.state.formValue}
                              onChange={this.handleChange.bind(this)}
                              onBlur={this.handleSubmit.bind(this)}/>
                      </FormGroup>
                  </Form>
                  : <span style={{
                      textDecoration: this.state.hovering ? 'underline' : 'none'
                  }}
                          onMouseOver={() => this.setState({hovering: true})}
                          onMouseLeave={() => this.setState({hovering: false})}>
                      {renderValWithDefault(val)}
                  </span>}
              </span>
        );
    }
}


//
//         return (
//             <span onClick={this.enableEditing.bind(this)}>
//               {this.state.formActive ?
//                   <form
//                       style={{ display: 'inline' }}
//                       onSubmit={this.handleSubmit.bind(this)}>
//                       <input
//                           type='text'
//                           value={this.state.formValue}
//                           ref={c => this.input = c}
//                           onChange={this.handleChange.bind(this)}
//                           onBlur={this.handleSubmit.bind(this)}/>
//                   </form>
//                   : <span style={{
//                       textDecoration: this.state.hovering
//                           ? 'underline' : 'none' }}
//                       onMouseOver={() => this.setState({ hovering: true })}
//                       onMouseLeave={() => this.setState({ hovering: false })}>
//                       {renderValWithDefault(val)}
//                   </span> }
//               </span>
//         );
//     }
// }