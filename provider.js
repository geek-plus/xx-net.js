'use strict';
const fs=require('fs');

var providers=[];

try{
    fs.readdirSync('./providers').forEach((file,index)=>{
        providers.push(require('./providers'+file));
    });
}
catch(err){};


module.exports=(config)=>{
    for(var provider of providers){
        provider.config(config[provider.name]);
    }

    var handler;
    handler.request=(req,res)=>{
        preoviders[0].request(handler);
    }
    return handler;
}