var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

var fakeio = function(server) {
  return function() {
    return server.socketClient;
  }
};

var fakeData = function() {
  return {
    name: "Heathrow",
    centre_id: 1,
    beds: [{
      type: "male",
      available: _.random(0,50),
      ooc: 3
    },{
      type: "female",
      available: _.random(0,50),
      ooc: 2
    }],
    booked: _.random(0,50),
    reserved: _.random(0,50)
  }
}

var start = function() {
  console.log('simulator starting');

  server.emit('populate', fakeData());

  setInterval(function() {
    server.emit('populate', fakeData());
  },1000);

};

module.exports = {
  server: server,
  client: fakeio(server),
  start: start
};
