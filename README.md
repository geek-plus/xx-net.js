#xx-net.js
a nodejs version of general purpose **HTTP/HTTPS MAN-IN-THE-MIDDLE PROXY** , with multiple backends.

##certificates

MTIM root CA certificate and other certificates are automatically created based on random RSA key pair created by node-forge.

root CA certificate is at **./ca.crt**,RSA private key of root CA is at **./private.pem**, public key is at **./public.pem**.

Automatic genration of root CA **SHOULD NOT** run , **IF ONLY** the above **3 files** are **present** ,
and the given **certificate** is not **obsolete**，
and the given **key pair** is **correct**.

##configuration
all configuration files are in config.d , and all files in config.d are used as configuration.

default configuration is at **./config.js**.