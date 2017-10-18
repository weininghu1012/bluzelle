module.exports = (selector) => {
    beforeEach(() => {
        browser.url('http://localhost:3000');
    });

    return () => browser.element(selector);
};

