import {JSONEditor} from "./JSONEditor";
import {getSwarmData} from '../services/DataService';

const MainComponent = () => (
    <ReflexContainer
        style={{height: '100%'}}>

        <ReflexFixed>
            <h1>Database</h1>
        </ReflexFixed>

        <ReflexElement flex={1}>
            <ReflexContainer orientation='vertical'>
                <ReflexElement>
                    Keys
                </ReflexElement>
                <ReflexSplitter/>
                <ReflexElement>
                    <JSONEditor obj={getSwarmData()} propName='key1' isRoot={true}/>
                </ReflexElement>
            </ReflexContainer>
        </ReflexElement>
    </ReflexContainer>
);

export const Main = observer(MainComponent);