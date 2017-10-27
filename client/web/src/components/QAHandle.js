import {receiveMessage} from "../services/CommunicationService";

export default class QAHandle extends Component {

    constructor(){
        super();
        this.state={value:""};
    }

    onChange(ev) {
        this.setState({value:ev.target.value})
    }

    submit(ev){
        receiveMessage(this.textarea.value);
        this.textarea.value = "";
    }

    render() {
        return (
            <div id="test-message-receiver">
            <textarea ref={r => this.textarea = r} onChange={this.onChange.bind(this)} value={this.state.value} />
                <button onClick={this.submit.bind(this)} />
            </div>
        )
    }
}