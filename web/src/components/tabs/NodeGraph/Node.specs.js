import Node from './Node'

console.log(Node);

describe('tabs/NodeGraph/Node', () => {
    it('should mount without errors', () => {
        const wrapper = mount(<Node node={{address: 1, xAngle: 0, yAngle: 0}} onMouseOver={() => {}} selected={false}/>);
        expect(wrapper).to.have.html('<circle cx="100" cy="100" r="3"></circle>');
        wrapper.unmount();
    });

    it('should not have a second circle when not selected', () => {
        it('should include another circle when selected', () => {
            const wrapper = mount(<Node node={{address: 1, xangle: 0, yAngle: 0}} onMouseOver={() => {}} selected={false}/>)
            expect(wrapper).to.have.exactly(1).descendants('circle');
            wrapper.unmount();
        });
    });

    it('should include another circle when selected', () => {
        const wrapper = mount(<Node node={{address: 1, xangle: 0, yAngle: 0}} onMouseOver={() => {}} selected={true}/>)
        expect(wrapper).to.have.exactly(2).descendants('circle');
        wrapper.unmount()
    });
});