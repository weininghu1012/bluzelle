export class Deletable extends Component {
    render() {
        const {children, update} = this.props;

        return (
            <React.Fragment>
                { children }
                <button style={{
                    float: 'right',
                    lineHeight: '10px'
                }} onClick={ () => update(undefined) }>X</button>
            </React.Fragment>
        );
    }
}