const http = require('http');
const fs = require('fs');
const path = require('path');


let server;

export const start = function(port=8200) {
    addReact();

    const filename = path.resolve(__dirname + '/test-app/index.html');

    server = http.createServer(function (request, response) {
        response.writeHead(200);
        response.end(fs.readFileSync(filename));
    });

    server.listen(port);

};


export const close = function() {
    server && server.close();
};



const reactLink = __dirname + '/test-app/react.js';

const addReact = function() {
    if(fs.existsSync(reactLink)) {
        return;
    }

    const reactDir = path.dirname(require.resolve('react'));
    const reactPath = reactDir + '/umd/react.production.min.js';

    fs.symlinkSync(reactPath, reactLink);

};

const removeReact = function() {
    if(!fs.existsSync(reactLink)) {
        return;
    }

    fs.unlinkSync(reactLink);
};