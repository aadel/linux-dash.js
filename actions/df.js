/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'df';
action.description = 'Returns disk usage information';
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
  exec("/bin/df -h|awk '{print $1\",\"$2\",\"$3\",\"$4\",\"$5\",\"$6}'", function (error, stdout, stderr) {
    var lines = stdout.split('\n');
    for (var i = 1; i < lines.length - 1; i++) {
      var values = lines[i].split(',');
      output.push(values);
    }
    connection.response = output;
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;