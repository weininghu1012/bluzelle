class SimpleComponent extends React.Component {

    render() {
        return React.createElement('div', null, this.props.text);
    }

}

// Not doing so well!
// Might as well set up a simple webpack project to test it.
// Must use ES6 to be compatible with react-functional-test module.

const root = ReactDOM.render(
    React.createElement(SimpleComponent, { text: 'hello world' }, null),
    document.getElementById('react-root')
);

testHooks({ root: root, TestUtils: ReactTestUtils });