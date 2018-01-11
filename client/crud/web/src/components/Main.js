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
                    Data
                </ReflexElement>
            </ReflexContainer>
        </ReflexElement>
    </ReflexContainer>
);


