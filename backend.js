'use strict';
const fs=require('fs');

var backends=[];

try{
    fs.readdirSync('./backends').forEach((file,index)=>{
        backends.push(require('./backends'+file));
    });
}
catch(err){};


module.exports=(config)=>{
    for(var item of backends){
        item.config(config[item.name]);
    }

    var handler;
    handler.request=(req,res)=>{
        backends[0].request(handler);
    }
    return handler;
}