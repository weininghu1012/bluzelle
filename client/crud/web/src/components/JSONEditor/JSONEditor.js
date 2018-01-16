import './JSONEditor.css';


export const JSONEditor = ({json}) => {

    // If object
    if (typeof json === 'object' && !Array.isArray(json)) {
        return <RenderObject json={json}/>;
    }

    // If array
    if (Array.isArray(json)) {
        return renderArray(json);
    }

    // Standard datatypes
    return <div>{json.toString()}</div>;

};



const triangleRight = '\u25b6';
const triangleDown = '\u25bc';

class Collapsible extends React.Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: props.collapsed || false };
    }

    toggleCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    collapseTriangle() {
        return this.state.collapsed ? triangleRight : triangleDown;
    }

}


class RenderObject extends Collapsible  {

    render()
    {
        const { json } = this.props;

        return (
            <div className='jsoneditor-obj'>
            <span onClick={() => this.toggleCollapse()}>
                {this.collapseTriangle()} {'{}'} ({Object.entries(json).length} entries)
            </span>
                <div className='jsoneditor-indent'>
                    {this.state.collapsed || keyValuePairs(json)}
                </div>
            </div>
        );
    }
}

const keyValuePairs = json => Object.entries(json).map(([key, value]) =>
    <div key={key}>
        <span>{key}</span>: <JSONEditor key={key} name={key} json={value}/>
    </div>);


const renderArray = json => (
    <div className='jsoneditor-arr'>
        {triangleRight} {'[]'} ({json.length} entries)
        <div className='jsoneditor-indent'>
            {indexValuePairs(json)}
        </div>
    </div>
);

const indexValuePairs = json => json.map((value, index) =>
    <div key={index}>
        <span>({index})</span>: <JSONEditor name={''} json={value}/>
    </div>);