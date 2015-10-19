var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

var faker = require('../simulator/faker');

var centresSimulated = 3;

var fakeio = function(server) {
  return function() {
    return server.socketClient;
  }
};

var fakeData = function(centre) {
  var centre = centre || _.random(1,centresSimulated);
  return faker.Centre(centre);
};

var start = function() {
  // start an event stream for n centres with each one emitting at a randomised interval
  _(centresSimulated).times(function(idx) {
    setInterval(function() {
      server.emit('centre_id/'+(idx+1), fakeData(idx+1));
    }, _.random(1000,3000));
  });
};

server.socketClient.connected = true;

server.on('get', function(payload) {
  if (payload.url == "/centre") {
    return { body: _(centresSimulated).times(function(idx) {
      return fakeData(idx+1);
    }) };
  } else {
    return fakeData(myString[payload.url.length - 1]);
  }
});

module.exports = {
  server: server,
  client: fakeio(server),
  start: start
};
