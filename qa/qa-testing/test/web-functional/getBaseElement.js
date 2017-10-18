module.exports = (selector) => {
    const ret = {};
    beforeEach(() => {
        browser.url('http://localhost:3000');
        ret.el = browser.element(selector);
    });
    return ret;
};