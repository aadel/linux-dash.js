/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'ps';
action.description = 'Returns running processes';
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
  exec("/bin/ps aux | /usr/bin/awk 'NR>1{print $1\",\"$2\",\"$3\",\"$4\",\"$5\",\"$6\",\"$7\",\"$8\",\"$9\",\"$10\",\"$11}'",
       function (error, stdout, stderr) {
    var procs = [];
    var procLines = stdout.split('\n');
    for (var i = 0; i < procLines.length - 1; i++)
      procs.push(procLines[i].split(','));
    
    connection.response = procs;
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;