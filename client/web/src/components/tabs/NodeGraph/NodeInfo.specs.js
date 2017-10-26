import NodeInfo from './NodeInfo'

describe('components/NodeGraph/NodeInfo', () => {

    it('should render a table showing node information', () => {
        const node = {address: '0xff', nodeState: 'alive', messages: 100};

        const wrapper = shallow(<NodeInfo node={node} />);

        expect(wrapper.find('td').map(x => x.text())).to.deep.equal(['0xff', '100', 'alive'])

    })
});