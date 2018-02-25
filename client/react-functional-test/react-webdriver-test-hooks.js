import TestUtils from 'react-dom/test-utils';

export const addHooks = ({ root, ...hooks }) => {

    !root && console.error('Must supply key "root" to addHooks');

    window.hooks = {
        root,
        ...hooks,
        TestUtils
    };


    // Usage: assert(() => 1 + 1 === 2);
    window.assert = fn => {
        if(typeof fn !== 'function') {
            throw new Error('Must pass function to assert.');
        }

        if(!fn()) {
            throw new Error(fn.toString());
        }
    };

    window.throwAsync = (err, done) => {
        done({
            name: err.name,
            stack: err.stack,
            message: err.message
        });
    };

    window.waitFor = (fn, done, timeout=500) => {
        const start = new Date().getTime();

        const loop = (resolve, reject) => {
            try {
                fn();
                resolve();
            } catch(e) {
                if(new Date().getTime() - start > timeout) {
                    e.name = "(waitFor timeout) " + e.name;
                    throwAsync(e, done);
                }

                setTimeout(loop, 100, resolve, reject);
            }
        };

        return new Promise(loop);
    };
};