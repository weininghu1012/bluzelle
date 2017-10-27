module.exports = (selector) => {
    beforeEach(() => {
        browser.url('http://localhost:3000?functional-testing');
    });

    return () => browser.element(selector);
};

