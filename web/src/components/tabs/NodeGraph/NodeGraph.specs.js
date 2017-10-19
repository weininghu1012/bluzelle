import NodeGraph from './NodeGraph'

describe('components/NodeGraph/NodeGraph', () => {
    it('should render without errors if there are no nodes', () => {
        const wrapper = mount(<NodeGraph/>)
        expect(wrapper).to.have.html().match(/0 Nodes/);
        wrapper.unmount();
    });
});