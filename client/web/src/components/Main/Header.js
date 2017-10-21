import {socketState} from 'services/CommunicationService'
import logo from './logo-color.png'
import {daemonUrl, disconnect} from "../../services/CommunicationService";
import Button from 'react-bootstrap/lib/Button'

const Header = () => (
    <header>
        {daemonUrl.get() && (
            <div style={{float: 'right', padding: 10}}>
                <div>{socketStates[socketState.get()]} to {daemonUrl.get()}</div>
                <div>
                <Button bsSize="xsmall" onClick={disconnect}>Disconnect</Button>
                </div>
            </div>
        )}
        <div style={{height: 50, padding: 2}}>
            <img src={logo}/>
        </div>
    </header>
);

export default observer(Header);



const socketStates = ['Connecting', 'Connected', 'Closing', 'Closed'];