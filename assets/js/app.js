var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var Backbone = require('backbone');

var viewCentre = require('./views/centre');
var viewStat = require('./views/stat');

var myRouter = Backbone.Router.extend({

    routes: {
      "": "handleRouteAvailability",
      "simulator": "handleRouteAvailability",
      "statistics": "handleRouteStat"
    },

    handleRouteAvailability: function () {
      var io;
      var socket0;
      var container = $('#content_container');
      var simulator = require('./socketSimulator');

      socketio = simulator.client;
      simulator.start();

      io = sailsIOClient(socketio);

      io.sails.autoConnect = false;

      socket0 = io.sails.connect();

      socket0.get('/centre', function serverResponded(payload) {
        _.each(payload, function(item,idx) {
          container.append('<div class="centre_data" id="item'+idx+'"></div>');
          var thisViewCentre = new viewCentre({
            el: '#item'+idx,
            socket: socket0
          });
          thisViewCentre.model.set(item);
        })
      });
      $(".centre_data").wrapAll("<div id='centres' />");
      $("<h1>IRC breakdown availability</h1>").insertBefore("#item0");
    },

    handleRouteStat: function () {
      var io;
      var socket1;
      var container = $('#content_container');
      var simulator2 = require('./socketSimulator');

      socketio = simulator2.client;
      simulator2.start();

      io = sailsIOClient(socketio);

      io.sails.autoConnect = false;

      socket1 = io.sails.connect();

      container.empty();

      socket1.get('/stat', function serverResponded(payload) {
        _.each(payload, function(item,idx) {
          container.append('<div class="stat_data" id="stat'+idx+'"></div>');
          var thisViewStat = new viewStat({
            el: '#stat'+idx,
            socket: socket1
          });
          thisViewStat.model.set(item);
        })
      });
      $(".stat_data").wrapAll("<div id='stats' />");
      $("<h1>IRC bed availabilities</h1>").insertBefore("#stat0");
    }

});

$(function () {
  router = new myRouter();
  Backbone.history.start();
})
