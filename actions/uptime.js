/* jshint strict: true */

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'uptime';
action.description = 'Returns uptime';
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
  exec("/usr/bin/cut -d. -f1 /proc/uptime", function (error, stdout, stderr) {
    var uptimeSeconds = stdout;
    var uptimeMin   = uptimeSeconds / 60;
    var uptimeHours = uptimeMin / 60;

    var days  = Math.floor(uptimeHours / 24);
    var hours = Math.floor(uptimeHours - (days * 24));
    var min   = Math.floor(uptimeMin - (days * 60 * 24) - (hours * 60));
    
    var formatUptime = '';
    if (days !== 0) formatUptime += days + " days ";
    if (hours !== 0) formatUptime += hours + " hours ";
    if (min !== 0) formatUptime += min + " minutes";
    
    connection.response = formatUptime;
    next(connection, true);
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;