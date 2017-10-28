import memoize from 'lodash/memoize'

export const isTestMode = memoize(() => /\?functional-testing/.test(window.location.href));
