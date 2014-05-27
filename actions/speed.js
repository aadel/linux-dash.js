/* jshint strict: true */

var http = require('http');
var fs = require('fs');
var sys = require('sys');

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'speed';
action.description = 'Returns download speed';
action.inputs = {
  'required' : [],
  'optional' : []
};

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next) {
  'use strict';
  
  var file = fs.createWriteStream("10MB.zip");
  var start_time = new Date().getTime();
  console.log(start_time);
  var request = http.get("http://afaq.dreamhosters.com/10MB.zip", function(response) {
    response.pipe(file);
    response.on('end', function () {
      console.log('Download complete');
      console.log(end_time);
      var end_time = new Date().getTime();
      connection.response = (10 * 1024 * 1024) / ((end_time - start_time) / 1000 );
      next(connection, true);
    });
  }).on('error', function(e) {
    console.log("Error: " + e.message);
  });

};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;