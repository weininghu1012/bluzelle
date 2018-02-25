import React from 'react';
import ReactDOM from 'react-dom';

class SimpleComponent extends React.Component {

    render() {
        return <div>{this.props.text}</div>;
    }

}

const root = ReactDOM.render(
    <SimpleComponent text='hello world'/>,
    document.getElementById('react-root')
);

// testHooks({ root: root, TestUtils: ReactTestUtils });