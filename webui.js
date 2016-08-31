'use strict'
const http = require('http');
const fs = require('fs');

var html = '';

fs.readFile('./webui.html', 'utf8', (err, data) => {
    html=data;
})


module.exports = (globalConfig, backend, proxy, config) => {
    for (const address of config.listen) {
        http.createServer((req, res) => {
            if(req.method=='GET'){
                res.write('HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n'+html).end();
            }
            else if(req.method=='POST'){

            }
        }).listen(address.port, address.ip);
    }
}