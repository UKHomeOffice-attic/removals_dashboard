var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

var faker = require('../simulator/faker');

var fakeio = function(server) {
  return function() {
    return server.socketClient;
  }
};

var fakeData = function(centre) {
  var centre = centre || _.random(1,3);
  return faker.Centre(centre);
};

server.socketClient.connected = true;

server.on('get', function(payload) {
  if (payload.url == "/centre") {
    return { body: _(3).times(function(idx) {
      return fakeData(idx+1);
    }) };
  } else {
    return fakeData(myString[payload.url.length - 1]);
  }
});

server.on('subscribe', function(payload) {
  console.log('dashboard subscribing to centre_id',payload);

  setInterval(function() {
    server.emit('centre_id/'+payload, fakeData(payload));
  }, _.random(1000,3000));
});

module.exports = {
  server: server,
  client: fakeio(server)
};
