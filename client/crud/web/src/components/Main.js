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
                        number: 123,
                        hey: true,
                        string: "hey world",
                        nestedObj: {
                            float: 123.321,
                            anotherString: "woohoo",
                            nested2: {
                                a: 123
                            }
                        }
                    }}/>
                </ReflexElement>
            </ReflexContainer>
        </ReflexElement>
    </ReflexContainer>
);