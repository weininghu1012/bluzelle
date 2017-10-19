import NodeList from './NodeListTabBody'

describe('components/NodeListTabBody', () => {
    it('should render without errors if there are no nodes', () => {
        const wrapper = shallow(<NodeList/>);
        expect(wrapper).to.have.html().match(/Address/);
    });
});