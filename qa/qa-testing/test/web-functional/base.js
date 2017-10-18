module.exports.getBase = (selector) => {
    beforeEach(() => {
        browser.url('http://localhost:3000');
        global.base = browser.element(selector);
    })
};