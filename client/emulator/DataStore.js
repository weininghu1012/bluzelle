const {observable, toJS} = require('mobx');


// const data = observable.map({});
const data = observable.map(getSampleData());

const mergeAndDelete = (val, key) =>
    val === 'deleted' ? data.delete(key) : data.set(key, val);

module.exports = {
    updateData: changes => {

        for(let key in changes) {
            mergeAndDelete(changes[key], key);
        }

        console.log("New data: " + JSON.stringify(toJS(changes)) + "; new store: " + JSON.stringify(toJS(data)));
    },
    getData: (obj, ws) => ws.send(JSON.stringify({cmd: 'updateData', data: toJS(data)}))
};


function getSampleData() {
    return {
        helloWorldText: [1, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
        helloWorldObj: [0, 123, 34, 99, 111, 119, 34, 58, 34, 109, 111, 111, 34, 125]
    };
}