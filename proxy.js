'user strict';
const http=require('http');
const https=require('https');
const forge=require('node-forge');
const pki=forge.pki;
const fs=require('fs');

var keys;

try{
    keys.privateKey = pki.privateKeyToPem(fs.readFileSync('private.pem'));
    keys.publicKey = pki.publicKeyToPem(fs.readFileSync('public.pem'));
}
catch(err) {
    genCA();
}

function genCA(){
    var cert;
    cert=pki.createCertificate();
    keys = pki.rsa.generateKeyPair();
    cert.publicKey = keys.publicKey;
    cert.setSubject([{name:'commonName',value:'xx-net.js'}]);
    cert.setIssuer([{name:'commonName',value:'xx-net.js'}]);
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
    
    cert.sign(keys.privateKey);
    fs.writeFile('ca.crt',pki.certificateToPem(cert),()=>{console.log('cert certificate generated , place add it to browser')});
    fs.writeFile('private.pem',pki.privateKeyToPem(keys.privateKey));
    fs.writeFile('public.pem',pki.publicKeyToPem(keys.publicKey));

    cert.setExtensions([{
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
    
    return;
}

module.exports=function(provider,config){

}



function handler(req,res,provider) {
    
}