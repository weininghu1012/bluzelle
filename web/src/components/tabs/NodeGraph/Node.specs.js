import Node from './Node'

console.log(Node);

describe('tabs/NodeGraph/Node', () => {
    it('should mount without errors', () => {
        const wrapper = mount(<Node node={{address: 1}} onMouseOver={() => {}} selected={false}/>);
        expect(wrapper).to.have.html().match(/\<circle/);
    })
});