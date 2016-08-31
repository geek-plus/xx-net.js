'user strict';
const net = require('net');
const http = require('http');
const https = require('https');
const url = require('url');
const ca = require('./ca.js');
const fs = require('fs');



module.exports = function (backend, config) {
    config.listen.forEach((address) => {
        http.createServer((req, res) => { handler(req, res, backend); }).on('connect',
        (req, cltSocket, head) => {
            var mitmSocket = net.connect(
                https.createServer(ca.sign(url.parse(`https://${req.url}`).hostname), (req, res) => { handler(req, res, backend); }).listen(0, '127.0.0.1').address().port,
                '127.0.0.1',
                () => {
                    cltSocket.write('HTTP/1.1 200 Connection Established\r\nProxy-agent: xx-net.js\r\n\r\n');
                    mitmSocket.pipe(cltSocket);
                    cltSocket.pipe(mitmSocket);
                });
        }).listen(address.port, address.ip);
    });
}

module.exports.ca = ca;

function handler(req, res, backend) {

}