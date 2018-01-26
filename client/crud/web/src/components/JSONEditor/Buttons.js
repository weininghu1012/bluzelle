import {Button} from 'react-bootstrap';

const common = {
    border: 0,
    background: 'none',
    height: 10
};

export const Delete = ({ onClick }) => (
    <Button
        style={{
            ...common,
            float: 'right',
            color: 'red'
        }} onClick={ onClick }>
        X
    </Button>
);


const PENCIL = '\u270E';

export const Edit = ({ onClick }) => (
    <Button style={{
        ...common,
        float: 'right',
        color: 'orange'
    }} onClick={ onClick }>
        {PENCIL}
    </Button>
);

export const Plus = ({ onClick }) => (
    <Button style={{
        ...common,
        color: 'green'
    }} onClick={ onClick }>
        +
    </Button>
);