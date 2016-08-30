'user strict';
const http=require('http');
const https=require('https');
const forge=require('node-forge');
const pki=forge.pki;
const fs=require('fs');

var CAKeys;
var CACert;
try{
    CAKeys.privateKey = pki.privateKeyToPem(fs.readFileSync('private.pem'));
    CAKeys.publicKey = pki.publicKeyToPem(fs.readFileSync('public.pem'));
}
catch(err) {
    genCA();
}

function genCA(){
    CACert=pki.createCertificate();
    CAKeys = pki.rsa.generateKeyPair();
    CACert.publicKey = CAKeys.publicKey;
    CACert.setSubject([{name:'commonName',value:'xx-net.js'}]);
    CACert.setIssuer([{name:'commonName',value:'xx-net.js'}]);
    CACert.validity.notBefore = new Date();
    CACert.validity.notAfter = new Date();
    CACert.validity.notAfter.setFullYear(CACert.validity.notBefore.getFullYear()+1);
    CACert.setExtensions([{
        name: 'basicConstraints',
        cA: true
    }, {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true
    }, {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true
    }, {
        name: 'nsCertType',
        client: true,
        server: true,
        email: true,
        objsign: true,
        sslCA: true,
        emailCA: true,
        objCA: true
    }]);
    
    CACert.sign(CAKeys.privateKey);
    fs.writeFile('ca.crt',pki.CACertificateToPem(CACert),()=>{console.log('new CA certificate generated at ./ca.crt , place add it to browser and remove obsolete CA certificates(if any)')});
    fs.writeFile('private.pem',pki.privateKeyToPem(CAKeys.privateKey));
    fs.writeFile('public.pem',pki.publicKeyToPem(CAKeys.publicKey));

    return;
}


module.exports=function(provider,config){

}



function handler(req,res,provider) {
    
}