var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var Backbone = require('backbone');

var viewCentre = require('./views/centre');
var viewStat = require('./views/stat');

var params = document.location.search.replace("?","").split("&");
var simulatorParam = _.find(params, function(item) {
  return item.match('simulator');
});
var staticParam = _.find(params, function(item) {
  return item.match('static');
});

var myRouter = Backbone.Router.extend({

    routes: {
      "": "handleRouteAvailability",
      "?simulator": "handleRouteAvailability",
      "?simulator&static": "handleRouteAvailability",
      "availability": "handleRouteAvailability",
      "statistics": "handleRouteStat"
    },

    handleRouteAvailability: function () {
      var io;
      var socket0;
      var container = $('#content_container');

      if (simulatorParam) {
        var simulator = require('./socketSimulator');
        socketio = simulator.client;
        if (!staticParam) {
          simulator.start();
        }
      }

      io = sailsIOClient(socketio);

      io.sails.autoConnect = false;
      if (!simulatorParam) io.sails.url = 'http://localhost:8080';

      socket0 = io.sails.connect();

      container.empty();
      container.append("<h1>IRC bed availability</h1>");

      socket0.get('/centre', function serverResponded(payload) {
        _.each(payload.data, function(item,idx) {
          container.append('<div class="centre_data" id="item'+idx+'"></div>');
          var thisViewCentre = new viewCentre({
            el: '#item'+idx,
            socket: socket0
          });
          thisViewCentre.model.set(item);
        })
      });
    },

    handleRouteStat: function () {
      var io;
      var socket1;
      var container = $('#content_container');

      if (simulatorParam) {
        var simulator = require('./socketSimulator');
        socketio = simulator.client;
        if (!staticParam) {
          simulator.start();
        }
      }

      io = sailsIOClient(socketio);

      io.sails.autoConnect = false;
      if (!simulatorParam) io.sails.url = 'http://localhost:8080';

      socket1 = io.sails.connect();

      container.empty();
      container.append("<h1>IRC bed stats</h1>");

      socket1.get('/centre', function serverResponded(payload) {
        _.each(payload.data, function(item,idx) {
          container.append('<div class="stat_data" id="stat'+idx+'"></div>');
          var thisViewStat = new viewStat({
            el: '#stat'+idx,
            socket: socket1
          });
          thisViewStat.model.set(item);
        })
      });
    }

});

$(function () {
  router = new myRouter();
  Backbone.history.start();
})
