import {JSONEditor} from "./JSONEditor";
import {RenderObject} from "./RenderObject";
import {RenderArray} from "./Arrays/RenderArray";
import {RenderTree} from "./RenderTree";
import {EditableField} from "./EditableField";
import {Hoverable} from "./Hoverable";
import {each} from 'lodash';
import {observableMapRecursive as omr} from "../../mobXUtils";

describe('JSONEditor', () => {

    describe('renders', () => {

        it('should render an object', () => {

            const obj = omr({ a: 5 });
            const mWrapper = mount(<JSONEditor obj={obj}/>);

            expect(mWrapper
                .find(RenderTree)
                .filterWhere(el => el.props().propName === 'a'))
                .to.have.length(1);
        });

        it('should render recursively', () => {
            const mWrapper = mount(<JSONEditor obj={omr({ a: { b: 5 }})}/>);

            expect(mWrapper
                .find(RenderTree)
                .filterWhere(el => el.props().propName === 'a'))
                .to.have.length(1);

            expect(mWrapper
                .find(RenderTree)
                .filterWhere(el => el.props().propName === 'b'))
                .to.have.length(1);
        });

    });


    describe('updates', () => {

        const types = {
            number: [123, 31.32],
            boolean: [true, false],
            string: ["hello", '"goodbye"']
        };

        each(types, ([val1, val2], type) => {
            it(`should update a ${type} field`, () => {

                const obj = omr({ a: val1 });
                const mWrapper = mount(<JSONEditor obj={obj}/>);

                mWrapper.find(EditableField).filterWhere(el => el.text() === JSON.stringify(val1)).simulate('click');
                mWrapper.find('input').simulate('change', { target: { value: JSON.stringify(val2) }});
                mWrapper.find('form').simulate('submit');

                expect(obj.get('a')).to.equal(val2);
            });
        });

        it('should delete a boolean field', () => {

            const obj = omr({ a: true });
            const mWrapper = mount(<JSONEditor obj={obj}/>);

            mWrapper
                .find(RenderObject)
                .find(Hoverable)
                .simulate('mouseOver');

            mWrapper
                .find('button')
                .filterWhere(el => el.text() === 'X')
                .simulate('click');

            expect(obj.get('a')).to.be.undefined;

        });

        it('should delete a deep field', () => {

            const obj = omr({
                field: 123,
                otherObject: {
                    a: true,
                    b: false,
                    c: [1, 2, 3, "delete this"]
                }
            });

            const mWrapper = mount(<JSONEditor obj={obj}/>);

            mWrapper
                .find(RenderTree)
                .filter({ propName: 3 })
                .simulate('mouseOver');

            mWrapper
                .find(RenderTree)
                .filter({ propName: 3 })
                .find('button')
                .filterWhere(el => el.text() === 'X')
                .first()
                .simulate('click');

            expect(obj.get('otherObject').get('c').length).to.equal(3);


            mWrapper
                .find(RenderTree)
                .filter({ propName: 'otherObject' })
                .simulate('mouseOver')
                .find('button')
                .filterWhere(el => el.text() === 'X')
                .first()
                .simulate('click');

            expect(obj.get('otherObject')).to.be.undefined;

        });


        it('should update color based on validity-state of JSON', () => {

            const obj = omr({ a: 5 });

            const mWrapper = mount(<JSONEditor obj={obj}/>);

            const ef = mWrapper
                .find(EditableField)
                .filterWhere(el => el.text() === '5');

            ef.simulate('click');

            const input = mWrapper.find('input');
            input.simulate('change', { target: { value: '[1, 2, 3]' }});


            expect(input.props()).to.have.property('type', 'text');

            // These classes are part of react-bootstrap.
            expect(input.props()).to.have.property('class', 'has-success');

            input.simulate('change', { target: { value: 'this is invalid json' }});

            expect(input.props()).to.have.property('class', 'has-error');

        });

    });


    describe('add new field', () => {

        it('should be able to rename the key of a field', () => {

            const obj = omr({
                somekey: 123
            });

            const wrapper = mount(<JSONEditor obj={obj}/>);

            wrapper.find(EditableField)
                .filterWhere(el => el.text() === 'somekey')
                .simulate('click');

            wrapper.find('input')
                .simulate('change', { target: { value: 'newkey' } });

            wrapper.find('form')
                .simulate('submit');

            expect(obj.get('newkey')).to.equal(123);
            expect(obj.get('somekey')).to.be.undefined;

        });


        it('should have a (+) button', () => {

            const wrapper = mount(<JSONEditor obj={omr({ a: 5 })}/>);

            wrapper.find(RenderObject).simulate('mouseOver');

            wrapper.find('button')
                .filterWhere(el => el.text() === '+')
                .simulate('click');

        });


        it('should have two consecutive inputs to create a new field', () => {

            const obj = omr({});

            const wrapper = mount(<JSONEditor obj={obj}/>);

            wrapper
                .find(Hoverable)
                .simulate('mouseOver');

            wrapper.find('button')
                .filterWhere(el => el.text() === '+')
                .simulate('click');

            wrapper.find('input')
                .simulate('change', { target: { value: 'keyname' } });

            wrapper.find('form')
                .simulate('submit');

            wrapper.find('input')
                .simulate('change', { target: { value: '51' } });

            wrapper.find('form')
                .simulate('submit');

            expect(obj.get('keyname')).to.equal(51);

        });

        it('should not create a new field if the user enters invalid key/json', () => {

            const obj = omr({});

            const wrapper = mount(<JSONEditor obj={obj}/>);

            wrapper
                .find(Hoverable)
                .simulate('mouseOver');

            wrapper.find('button')
                .filterWhere(el => el.text() === '+')
                .simulate('click');

            wrapper.find('input')
                .simulate('submit');

            wrapper.find('input')
                .simulate('change', { target: { value: 'invalid' } });

            wrapper.find('form')
                .simulate('submit');

            expect(obj.toJS()).to.be.empty;

        });


        it('should have a single input for new array values', () => {
            const obj = omr({ arr: [] });
            const wrapper = mount(<JSONEditor obj={obj}/>);

            wrapper.find(RenderArray)
                .simulate('mouseOver');

            wrapper.find(RenderArray)
                .find('button')
                .filterWhere(el => el.text() === '+')
                .simulate('click');

            wrapper.find('input')
                .simulate('change', { target: { value: '"hello world"' }});

            wrapper.find('form')
                .simulate('submit');

            expect(obj.get('arr').toJS()).to.deep.equal(["hello world"]);

        });

    });

});