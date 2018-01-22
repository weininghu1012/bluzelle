import {merge} from './merge';

describe('Merge function', () => {
    it('should merge with simple values', () => {

        expect(merge({ a: 5 }, { a: 6 })).to.have.property('a', 6);
        expect(merge({ a: 1, b: 2 }, { b: 10 }))
            .to.deep.equal({ a: 1, b: 10 });
    });

    it('should delete simple values', () => {

        expect(merge({ a: 5 }, { a: undefined })).to.be.empty;
    });

    it('should merge new objects', () => {

        expect(merge({ c: 5}, { a: { b: 4 }}))
            .to.deep.equal({ c: 5, a: { b: 4 }});
    });

    it('should delete whole objects', () => {

        expect(merge({ a: { b: [1, 2, 3] }}, { a: undefined }))
            .to.be.empty;
    });

    it('should merge deep fields', () => {

        expect(merge({ a: { b: { c: 5, d: true }}}, { a: { b: { c: 6 }}}))
            .to.deep.equal({ a: { b: { c: 6, d: true }}});
    });
});