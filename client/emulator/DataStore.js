const {observable, toJS} = require('mobx');

// const data = observable.map({});
const data = observable.map(getSampleData());

module.exports = {
    updateData: obj => {console.log('received update data')},
    getData: (obj, ws) => ws.send(JSON.stringify({cmd: 'updateData', data: toJS(data)}))
};


function getSampleData() {
    return {
        helloWorldText: [1, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
        helloWorldObj: [0, 123, 34, 99, 111, 119, 34, 58, 34, 109, 111, 111, 34, 125]
    };
}