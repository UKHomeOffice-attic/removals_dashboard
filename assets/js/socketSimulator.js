var _ = require('underscore');

var socket = require('socket-io-mock');
var server = new socket();

server.socketClient.connected = true;

server.on('get', function(payload) {
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

var centres = ['Heathrow','Harmandsworth','Colnbrook']

var fakeData = function() {
  var centre = _.random(0,2);

  return {
    name: centres[centre],
    centre_id: centre,
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
    reserved: _.random(0,50),
    links: [{
      rel: "self",
      href: "centre/"+centre
    },{
      rel: "events",
      href: "centre/"+centre+"/events"
    },{
      rel: "book",
      href: "centre/"+centre+"/book"
    }]
  }
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
