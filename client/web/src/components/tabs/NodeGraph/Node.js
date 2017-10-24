import nodeColors from 'constants/nodeStatusColors'

const Node = ({node, onMouseOver, selected}) => {
    const {address, nodeState, xAngle, yAngle} = node;
    const cx = 90 * xAngle + 100;
    const cy = 90 * yAngle + 100;
    return [
        <circle fill={nodeColors[nodeState]} onMouseOver={onMouseOver} key={`circle-${address}`} cx={cx} cy={cy} r={node.messageDelta ? '6' : '4'}/>,
        selected && <circle fill='white' key={`circle-border=${address}`} cx={cx} cy={cy} r="2"/>
    ];
};

export default Node

