import {ReflexContainer, ReflexElement} from 'react-reflex'

export const Main = () => (
    <ReflexContainer
        style={{height: '100%'}}
        orientation='horizontal'>

        <ReflexElement>
            Hello
        </ReflexElement>
        <ReflexElement>
            World
        </ReflexElement>
    </ReflexContainer>
);
