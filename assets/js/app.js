var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var Backbone = require('backbone');

var viewCentres = require('./views/centres');
var viewCentre = require('./views/centre');
var viewStats = require('./views/stats');
var viewStat = require('./views/stat');

var params = document.location.search.replace("?","").split("&");
var simulatorParam = _.find(params, function(item) {
  return item.match('simulator');
});
var staticParam = _.find(params, function(item) {
  return item.match('static');
});

var DashboardRouter = Backbone.Router.extend({
  routes: {
    "": "handleRouteAvailability",
    "?simulator": "handleRouteAvailability",
    "?simulator&static": "handleRouteAvailability",
    "availability": "handleRouteAvailability",
    "statistics": "handleRouteStat"
  },

  initialize: function() {
    console.log('router init');
    var io;

    if (simulatorParam) {
      var simulator = require('./socketSimulator');
      socketio = simulator.client;
      if (!staticParam) {
        simulator.start();
      }
    }

    io = sailsIOClient(socketio);

    io.sails.autoConnect = false;

    if (!simulatorParam) io.sails.url = location.search.split('backend=')[1] || 'http://localhost:8080';

    this.socket0 = io.sails.connect();
  },

  handleRouteAvailability: function() {
    var self = this;

    self.socket0.get('/centre', function serverResponded(payload) {
      new viewCentres({
        el: '#content_container',
        payload: payload,
        socket: self.socket0
      })
    });
  },

  handleRouteStat: function() {
    var self = this;

    self.socket0.get('/centre', function serverResponded(payload) {
      new viewStats({
        el: '#content_container',
        payload: payload,
        socket: self.socket0
      })
    });
  }
});

$(function () {
  new DashboardRouter();
  Backbone.history.start();
});
