import CenterMiddle from 'components/CenterMiddle'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import {socketState, daemonUrl} from "../../services/CommunicationService";
import Header from 'components/Main/Header'

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
                            <input type="text" ref={r => this.input = r} style={{width: '100%'}} placeholder="address of node" />
                            <div style={{marginTop: 10}}>
                            <Button disabled={socketState.get() !== 'closed'} onClick={this.go.bind(this)}>Go</Button>
                            </div>
                        </div>
                    </Panel>
                </div>
            </CenterMiddle>
        );
    }
}


