module.exports = (selector) => {
    const ret = {};
    beforeEach(() => {
        browser.url('http://localhost:3000');
        const el = browser.element(selector);
        Object.setPrototypeOf(ret, el);
    });
    return ret;
};

