'user strict';
const net = require('net');
const http = require('http');
const https = require('https');
const url = require('url');
const ca = require('./ca.js');
const fs = require('fs');



module.exports = function (backend, config) {
    var servers = { http: [], https: [] };
    config.listen.forEach((address) => {
        servers.http.push(
            http.createServer((req, res) => { backend(req, res); }).on('connect',
                (req, cltSocket, head) => {
                    var mitmServer = https.createServer(
                        ca.sign(url.parse(`https://${req.url}`).hostname),
                        (req, res) => { backend(req, res); }).listen(0, '127.0.0.1');
                    servers.https.push(mitmServer);
                    var mitmPort = mitmServer.address().port;
                    var mitmSocket = net.connect(
                        mitmPort,
                        '127.0.0.1',
                        () => {
                            cltSocket.write('HTTP/1.1 200 Connection Established\r\nProxy-agent: xx-net.js\r\n\r\n');
                            mitmSocket.write(head);
                            mitmSocket.pipe(cltSocket);
                            cltSocket.pipe(mitmSocket);
                        });
                    cltSocket.on('close', () => {
                        mitmServer.close();
                        servers.https.splice(ervers.https.indexOf(mitmServer), 1);
                    })
                }).listen(address.port, address.ip));
    });
    return servers;
}

module.exports.ca = ca;