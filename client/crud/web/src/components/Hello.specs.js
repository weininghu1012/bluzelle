describe('Hello World tests', () => {
    it('should pass a simple test', () => {
        expect(true).to.equal(true);
    });

    it('should fail a simple test', () => {
        expect(true).to.equal(false);
    });
});