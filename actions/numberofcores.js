/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'numberofcores';
action.description = 'Returns number of CPU cores';
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
  exec("/bin/grep -c ^processor /proc/cpuinfo", function (error, stdout, stderr) {
    connection.response = stdout;
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;