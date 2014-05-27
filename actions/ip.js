var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'ip';
action.description = 'Returns interfaces';
action.inputs = {
  'required' : [],
  'optional' : []
};

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next) {
  'use strict';
  
  var sys = require('sys');
  var os = require('os');
  var exec = require('child_process').exec;
  var output = [];


  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var i in interfaces) {
    for (var j in interfaces[i]) {
      var address = interfaces[i][j];
      addresses.push([i, address.address]);
    }
  }
    
  connection.response = addresses;
  next(connection, true);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
