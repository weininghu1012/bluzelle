// Obj1 is an arbitrary object, obj2 is a tree consisting
// of a path (single-key object tree) representing some update
// to obj1. This function will merge obj2 into obj1, mutating
// obj1 and returning it back.

// Merge is called to update a field and when a field is deleted.
// When a field is being deleted, it's value is set to undefined.

export const merge = (obj1, obj2) => {
    const key = nextKey(obj2);
    isShallow(obj1, obj2, key)
        ? mergeShallow(obj1, obj2, key)
        : merge(obj1[key], obj2[key]);

    return obj1;
};

const nextKey = obj2 => Object.keys(obj2)[0];

const isShallow = (obj1, obj2, key) =>
    !(typeof obj1[key] === 'object' && typeof obj2[key] === 'object');


const mergeShallow = (obj1, obj2, key) =>
    obj2[key] === undefined
        ? deleteKey(obj1, obj2, key)
        : changeKey(obj1, obj2, key);

const deleteKey = (obj1, obj2, key) =>
    Array.isArray(obj1) ? obj1.splice(key, 1) : delete obj1[key];

const changeKey = (obj1, obj2, key) =>
    obj1[key] = obj2[key];