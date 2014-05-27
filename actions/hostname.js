/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'hostname';
action.description = 'Returns hostname';
action.inputs = {
  'required' : [],
  'optional' : []
};

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next) {
  'use strict';
  
  var sys = require('sys');
  var exec = require('child_process').exec;
  var output = [];
  exec("/bin/hostname", function (error, stdout, stderr) {
    connection.response = stdout;
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;