const http = require('http');
const fs = require('fs');
const path = require('path');


let server;

export const start = function(port=8200) {
    const filename = path.resolve(__dirname + '/test-app/dist/index.html');

    server = http.createServer(function (request, response) {
        response.writeHead(200);
        response.end(fs.readFileSync(filename));
    });

    server.listen(port);
};


export const close = function() {
    server && server.close();
};