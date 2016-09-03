'use strict';
const fs=require('fs');

module.exports=(config)=>{
    var govenor=govenor[config.govenorName](config);
    return govenor;
}

var govenor={};

govenor.pac=(config)=>{
    return (req,res)=>{
        
    }
}

govenor.single=(config)=>{
    var selected=config.govenor.single.backendName;
    return require('./backends'+selected)(config[selected]);
}

govenor.priority=(config)=>{
    return (req,res)=>{

    }
}