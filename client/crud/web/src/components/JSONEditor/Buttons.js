const common = {
    border: 0,
    background: 'none',
    height: 10
};

export const Delete = ({ onClick }) => (
    <button
        style={{
            ...common,
            float: 'right',
            color: 'red'
        }} onClick={ onClick }>
        X
    </button>
);


const PENCIL = '\u270E';

export const Edit = ({ onClick }) => (
    <button style={{
        ...common,
        float: 'right',
        color: 'orange'
    }} onClick={ onClick }>
        {PENCIL}
    </button>
);

export const Plus = ({ onClick }) => (
    <button style={{
        ...common,
        color: 'green'
    }} onClick={ onClick }>
        +
    </button>
);