import {socketState} from 'services/CommunicationService'
import logo from './logo-color.png'

@observer
export default class Header extends Component {
    render() {
        return (
            <header>
                <div style={{float: 'right', padding: 10}}>
                    {socketStates[socketState.get()]}
                </div>
                <div style={{height: 50, padding: 2}}>
                    <img src={logo}/>
                </div>
            </header>
        )
    }
}

const socketStates = ['Connecting', 'Connected', 'Closing', 'Closed'];