import {Editor} from "./Editor";
import {getLocalDataStore} from '../services/DataService';
import {selectedKey, KeyList} from "./KeyList";
import {Header} from "./Header/Header";
import 'bootstrap/dist/css/bootstrap.css';
import {QueueEditor} from "./QueueEditor";

@observer
export class Main extends Component {
    constructor(props) {
        super(props);

        const obj = getLocalDataStore();
        this.state = {obj};
    }

    render() {

        const {obj} = this.state;

        return (
            <ReflexContainer style={{height: '100%'}}>
                <ReflexFixed>
                    <Header/>
                    <hr/>
                </ReflexFixed>
                <ReflexElement flex={1}>
                    <ReflexContainer orientation='vertical'>
                        <ReflexElement flex={0.4}>
                            <QueueEditor/>

                            <hr/>

                            <KeyList obj={obj}/>
                        </ReflexElement>
                        <ReflexSplitter/>
                        <ReflexElement>
                            {obj.has(selectedKey.get()) && <Editor obj={obj}/>}
                        </ReflexElement>
                    </ReflexContainer>
                </ReflexElement>
            </ReflexContainer>
        );
    }
}