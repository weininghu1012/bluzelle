module.exports = (selector) => {
    beforeEach(() => {
        browser.url('http://localhost:3000?functional-testing');
    });

    return () => {
        browser.waitForExist(selector, 2000);
        return browser.element(selector);
    };
};

