'use strict';

const forge=require('node-forge');
const pki=forge.pki;
const md=forge.md;
const fs=require('fs');

var issuer=[{name:'commonName',value:'xx-net.js'}];
var keys;
var ca;

try{
    ca=pki.certificateFromPem(fs.readFileSync('ca.crt'));
    keys.privateKey = pki.privateKeyFromPem(fs.readFileSync('private.pem'));
    keys.publicKey = pki.publicKeyFromPem(fs.readFileSync('public.pem'));
}
catch(err) {
    genCA();
}

function genCA(){
    ca=pki.createCertificate();
    keys = pki.rsa.generateKeyPair();

    ca.publicKey = keys.publicKey;
    ca.setSubject(issuer);
    ca.setIssuer(issuer);
    ca.validity.notBefore = new Date();
    ca.validity.notAfter = new Date();
    ca.validity.notAfter.setFullYear(ca.validity.notAfter.getFullYear()+1);
    ca.setExtensions([{
        name: 'basicConstraints',
        cA: true
    }]);
    
    ca.sign(keys.privateKey,md.sha256.create);
    fs.writeFile('ca.crt',pki.certificateToPem(ca),()=>{console.log('new CA certificate generated at ./ca.crt , place add it to browser and remove obsolete CA certificates(if any)')});
    fs.writeFile('private.pem',pki.privateKeyToPem(keys.privateKey));
    fs.writeFile('public.pem',pki.publicKeyToPem(keys.publicKey));

    return;
}

function sign(domain){
    var cert=pki.createCertificate();
    cert.publicKey=keys.publicKey;
    cert.setIssuer(issuer);
    cert.validity.notBefore=ca.validity.notBefore;
    cert.validity.notAfter=ca.validity.notAfter;
    cert.setSubject([{name:'commonName',value:domain}]);
    cert.sign(keys.privateKey);

    return {
        cert:pki.certificateToPem(cert),
        keys:{
            privateKey:pki.privateKeyToPem(keys.privateKey),
            publicKey:pki.publicKeyToPem(keys.publicKey)
        }
    };
}

module.exports.genCA=genCA;
module.exports.sign=sign;