'use strict';
const fs=require('fs');

var backendsInit=[];

try{
    fs.readdirSync('./backends').forEach((item,index)=>{
        backendsInit.push(require('./backends'+item));
    });
}
catch(err){};

// var backends=[];

module.exports=(config)=>{

    // for(let item of backendsInit)item(config,backends);

    var handler=govenor[config.govenor](config[config.govenor]);
    return handler;
}

var govenor={};

govenor.pac=(config)=>{

    return (req,res)=>{
        
    }
}

govenor.single=(config)=>{
    return (req,res)=>{
        
    }
}

