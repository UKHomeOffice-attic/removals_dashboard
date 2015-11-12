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
    io.sails.transports = ['polling'];

    if (!simulatorParam) io.sails.url = location.search.split('backend=')[1] || 'http://localhost:8080';

    this.container = $('#content_container');
    this.socket0 = io.sails.connect();
  },

  handleRouteAvailability: function() {
    var self = this;

    self.container.empty();
    self.container.append("<h1>IRC bed availability</h1>");
    self.socket0.on('connect', function () {
      self.socket0.get('/centre', function serverResponded(payload) {
        _.each(payload.data, function (item, idx) {
          self.container.append('<div class="centre_data" id="item' + idx + '"></div>');
          var thisViewCentre = new viewCentre({
            el: '#item' + idx,
            socket: self.socket0
          });
          thisViewCentre.model.set(item);
        })
      });
    });
  },

  handleRouteStat: function() {
    var self = this;

    self.container.empty();
    self.container.append("<h1>IRC bed stats</h1>");
    self.socket0.on('connect', function () {
      self.socket0.get('/centre', function serverResponded(payload) {
        _.each(payload.data, function (item, idx) {
          self.container.append('<div class="stat_data" id="stat' + idx + '"></div>');
          var thisViewStat = new viewStat({
            el: '#stat' + idx,
            socket: self.socket0
          });
          thisViewStat.model.set(item);
        })
      });
    });
  }
});

$(function () {
  new DashboardRouter();
  Backbone.history.start();
});
