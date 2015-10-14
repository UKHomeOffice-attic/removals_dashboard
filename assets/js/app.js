var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');

var view = require('./views/centre');

$(function() {
  var options = {};
  var params = document.location.search.replace("?","").split("&");

  var simulatorParam = _.find(params, function(item) {
    return item.match('simulator');
  });

  if (simulatorParam) {
    var simulator = require('./socketSimulator');
    socketio = simulator.client;

    simulator.start();
  }

  options.socket = socketio;

  new view(options);
});
