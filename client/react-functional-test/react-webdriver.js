
export const executeAsyncWithError = (browser, f, ...args) => {

    const a = browser.executeAsync(f, ...args);

    if(a.value !== null && typeof a.value === 'object' && a.value.stack) {
        const e = new Error();

        e.name = a.value.name;
        e.stack = a.value.stack;
        e.message = a.value.message;

        throw e;
    }

    return a;
};