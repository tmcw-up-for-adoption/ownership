#!/usr/bin/env node

var user = process.argv[2],
    ownership = require('./'),
    path = require('path'),
    names = require('./crypto-packages.json');

if (!user) throw new Error('usage: ' + path.basename(process.argv[1]) + ' user');

console.log('removing ' + user + ' from ' + names.length + 
  ' packages');

ownership.rmUserFromPackages(user, names, function(err) {
});