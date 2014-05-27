/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'loadavg';
action.description = 'Returns load average';
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
    var numberofcores = stdout;
    exec("/bin/cat /proc/loadavg | /usr/bin/awk '{print $1\",\"$2\",\"$3}'", function (error, stdout, stderr) {
      var loadavg = stdout.split(',');
      var loadmap = [];
      loadavg.map(function(item){
        loadmap.push ([item.trimRight(), parseInt(item * 100 / numberofcores)]);
      });
      connection.response = loadmap;
      next(connection, true);
    });
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;