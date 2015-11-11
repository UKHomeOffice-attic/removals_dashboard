var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

var generator = require('../schema/generate');

var centresSimulated = 3;

var fakeio = function(server) {
  return function() {
    return server.socketClient;
  }
};

var fakeData = function(centre) {
  var centre = centre || _.random(1,centresSimulated);
  return generator.Centre(centre);
};

var start = function() {
  // start an event stream for n centres with each one emitting at a randomised interval
  _(centresSimulated).times(function(idx) {
    setInterval(function() {
      server.emit('centre', fakeData(idx+1));
    }, _.random(1000,3000));
  });
};

server.socketClient.connected = true;

server.on('get', function() {
  return { body: fakeData(1) };
});

module.exports = {
  server: server,
  client: fakeio(server),
  start: start
};
