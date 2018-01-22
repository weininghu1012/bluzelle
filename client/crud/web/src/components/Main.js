import {JSONEditor} from "./JSONEditor";

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
                    <JSONEditor obj={{
                        a: 5,
                        b: 10,
                        c: true,
                        d: {
                            key1: "hello",
                            key2: "goodbye",
                            array: [1, 2, 3, 4, 5]
                        },
                        e: false
                    }}/>
                </ReflexElement>
            </ReflexContainer>
        </ReflexElement>
    </ReflexContainer>
);