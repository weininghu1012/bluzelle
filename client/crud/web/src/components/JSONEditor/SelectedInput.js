import {FormControl} from 'react-bootstrap';

export class SelectedInput extends Component {
    componentDidMount() {
        this.input && this.input.select();
    }

    render() {
        return <FormControl
            type='text'
            {...this.props}
            inputRef={c => this.input = c}/>;
    }
}