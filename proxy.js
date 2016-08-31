'user strict';
const port=require('empty-port')
const http=require('http');
const https=require('https');
const url=require('url');
const ca=require('./ca.js');
const fs=require('fs');



module.exports=function(backend,config){
    config.listen.forEach((address)=>{
    http.createServer((req,res)=>{

    }).on('connect',(req,cltSocket,head)=>{
        reqUrl=url.parse(`https://${req.url}`);
        signed=ca.sign(reqUrl.hostname);
        https.createServer({})
         cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: xx-net.js\r\n' +
                    '\r\n');
    }).listen(address.port,address.ip);
});
}

module.exports.ca=ca;

function handler(req,res,backend) {
    
}