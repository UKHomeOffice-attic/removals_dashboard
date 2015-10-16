var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

var faker = require('../simulator/faker');

server.socketClient.connected = true;

server.on('get', function() {
  start();

  return {
    body: _(3).times(fakeData)
  }
});

var fakeio = function(server) {
  return function() {
    return server.socketClient;
  }
};

var fakeData = function() {
  return faker.Centre(_.random(0,2));
};

var start = function() {
  console.log('simulator starting');

  setInterval(function() {
    server.emit('populate', fakeData());
  },1000);

};

module.exports = {
  server: server,
  client: fakeio(server),
  start: start
};
