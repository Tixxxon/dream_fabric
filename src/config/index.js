var fs    = require('fs'),
    nconf = require('nconf');

nconf.argv()
    .env()
    .file({file: 'config/config.json'});

module.exports = nconf;