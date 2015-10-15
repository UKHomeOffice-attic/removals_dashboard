var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var tabs = require('./vendor/jquery.tabs');
var sailsIOClient = require('sails.io.js');

var view = require('./views/centre');

$(function() {
  var io;
  var socket0;
  var container = $('#centres');
  var params = document.location.search.replace("?","").split("&");
  var simulatorParam = _.find(params, function(item) {
    return item.match('simulator');
  });

  if (simulatorParam) {
    var simulator = require('./socketSimulator');
    socketio = simulator.client;

    // to start the simulator manually
    // simulator.start();
  }

  io = sailsIOClient(socketio);

  io.sails.autoConnect = false;
  if (!simulatorParam) io.sails.url = 'http://localhost:8080';

  socket0 = io.sails.connect();

  socket0.get('/centre', function serverResponded(payload) {
    _.each(payload, function(item,idx) {
      container.append('<div id="item'+idx+'"></div>');

      var thisView = new view({
        el: '#item'+idx,
        socket: socket0
      });

      thisView.model.set(item);
    })

  });

  var $container = $('section.tabstuff');

  if ($container.find('.js-tabs').length) {
    $.each($container,function(index,div){
        $(div).tabs({
          scrollOnload: true,
          trackState: false
        });
    });
  }
});
