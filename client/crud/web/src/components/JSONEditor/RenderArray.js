import {RenderTree} from "./RenderTree";
import {Collapsible} from "./Collapsible";
import {Delete} from "./Delete";
import {Nested} from "./Nested";
import {get, del} from '../../mobXUtils';

@observer
export class RenderArray extends Component {
    render() {
        const {obj, propName, preamble, noDelete} = this.props;

        return <Collapsible
            label={`[] (${get(obj, propName).length} entries)`}
            buttons={
                <React.Fragment>
                    <NewField arr={get(obj, propName)}/>
                    {noDelete || <Delete onClick={() => del(obj, propName)}/>}
                </React.Fragment>}
            preamble={preamble}>
            {
                get(obj, propName).map((value, index) =>
                    <Nested key={index}>
                        <RenderTree
                            obj={get(obj, propName)}
                            propName={index}
                            preamble={<span>{index}</span>}/>
                    </Nested>)
            }
        </Collapsible>;
    }
}

const NewField = ({arr}) => (
    <button
        onClick={() => arr.push('newfield')}
        style={{
            border: 0,
            background: 'none',
            color: 'green'
        }}>
        +
    </button>
);