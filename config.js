'use strict';
const fs=require('fs');
const merge=require('merge')

var config={
    backend:{
        govenorName:'single',
        govenor:{
            single:{
                backendName:'direct'
            }
        },
        goagent:{

        },
        direct:{
            
        }
    },
    proxy:{
        listen:[{
            host:'localhost',
            port:8087
        }],
    },
    webui:{
        listen:[{
            ip:'localhost',
            port:8085
        }]
    }
};

try{
    fs.readdirSync('./config.d').forEach((file,index)=>{
        merge.recursive(config,JSON.parse(fs.readFileSync('./'+file)));
    });
}
catch(err){};

config.save=()=>{
    fs.writeFile('./config.d/00-autosave.config.json',JSON.stringify(config));
}

module.exports=config;