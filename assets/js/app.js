var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var view = require('./views/centre');

$(function() {
  var params = document.location.search.replace("?","").split("&");
  var simulatorParam = _.find(params, function(item) {
    return item.match('simulator');
  });

  if (simulatorParam) {
    var simulator = require('./socketSimulator');
    socketio = simulator.client;

    simulator.start();
  }

  var io = sailsIOClient(socketio);

  io.sails.autoConnect = false;
  io.sails.url = 'http://localhost:8080';

  new view({
    socket: io.sails.connect()
  });
});
