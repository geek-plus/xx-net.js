'use strict';
const fs=require('fs');
const merge=require('merge')

var config={
    provider:{},
    proxy:{
        listen:[{
            host:'localhost',
            port:8087
        }],
        mitmPort:8086
    },
    webui:{
        listen:[{
            ip:'0.0.0.0',
            port:8086
        },{
            ip:'::0',
            port:8086
        }]
    }
};

try{
    fs.readdirSync('./config.d').forEach((file,index)=>{
        merge.recursive(config,fs.readFileSync('./'+file));
    });
}
catch(err){};


module.exports=config;