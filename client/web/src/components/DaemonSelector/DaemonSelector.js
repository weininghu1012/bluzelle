import CenterMiddle from 'components/CenterMiddle'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import {daemonUrl} from "../../services/CommunicationService";
import Header from 'components/main/Header'

export default class DaemonSelector extends Component {
    go() {
        daemonUrl.set(this.input.value);
    }

    render() {
        return (
            <CenterMiddle>
                <div>
                    <Header />
                    <Panel style={{marginTop: 20}} header={<h3>Choose a Bluzelle node</h3>}>
                        <div style={{width: 400}}>
                            <input type="text" ref={r => this.input = r} style={{width: '100%'}} placeholder="address of daemon" />
                            <div style={{marginTop: 10}}>
                            <Button onClick={this.go.bind(this)}>Go</Button>
                            </div>
                        </div>
                    </Panel>
                </div>
            </CenterMiddle>
        );
    }
}


