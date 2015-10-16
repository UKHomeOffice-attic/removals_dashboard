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

var start = function() {
  console.log('simulator starting');

  setInterval(function() {
    server.emit('populate', fakeData());
  },1000);

};

server.socketClient.connected = true;

server.on('get', function() {
  start();

  return { body: _(3).times(function(idx) {
    return fakeData(idx+1);
  }) };
});

module.exports = {
  server: server,
  client: fakeio(server),
  start: start
};
