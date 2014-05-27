/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'mem';
action.description = 'Returns information about memory';
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
  exec("/usr/bin/free -tmo | /usr/bin/awk '{print $1\",\"$2\",\"$3-$6-$7\",\"$4+$6+$7}'", function (error, stdout, stderr) {
    connection.response = stdout.split('\n')[1].split(',');
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;