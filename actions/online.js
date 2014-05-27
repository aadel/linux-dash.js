/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'online';
action.description = 'Returns logged in users';
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
  exec("/usr/bin/w -h | /usr/bin/awk '{print $1\",\"$2\",\"$4\",\"$5\",\"$6\",\"$7\",\"$8}'", function (error, stdout, stderr) {
    var lines = stdout.split('\n');
    for (var i = 0; i < lines.length - 1; i++) {
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