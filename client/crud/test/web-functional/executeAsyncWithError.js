module.exports = (browser, f) => {

    const a = browser.executeAsync(f);

    if(a.value !== null && typeof a.value === 'object' && a.value.stack) {
        const e = new Error();

        e.name = a.value.name;
        e.stack = a.value.stack;
        e.message = a.value.message;

        throw e;
    }

    return a;
};