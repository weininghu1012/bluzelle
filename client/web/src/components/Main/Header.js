import {socketState} from 'services/CommunicationService'
import logo from './logo-color.png'
import {daemonUrl} from "../../services/CommunicationService";

const Header = () => (
    <header>
        {daemonUrl.get() && (
            <div style={{float: 'right', padding: 10}}>
                {socketStates[socketState.get()]}
            </div>
        )}
        <div style={{height: 50, padding: 2}}>
            <img src={logo}/>
        </div>
    </header>
);

export default observer(Header);




const socketStates = ['Connecting', 'Connected', 'Closing', 'Closed'];