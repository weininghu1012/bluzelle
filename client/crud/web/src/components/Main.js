import {JSONEditor} from './JSONEditor'

export const Main = () => (
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
                    <JSONEditor json={{
                        title: 'my title',
                        number: 123,
                        isSwanky: true,
                        moreStuff: {
                            arr: [1, 2, 3]
                        }
                    }}/>
                </ReflexElement>
            </ReflexContainer>
        </ReflexElement>
    </ReflexContainer>
);


