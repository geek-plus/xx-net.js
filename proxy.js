'user strict';
const http=require('http');
const https=require('https');
const ca=require('./ca.js');
const fs=require('fs');


module.exports=function(backend,config){
    config.listen.forEach((address)=>{
    http.createServer((req,res)=>{

    }).on('connect',(req,skt,res)=>{
        
    }).listen(address.port,address.ip);
});
}

module.exports.ca=ca;

function handler(req,res,backend) {
    
}