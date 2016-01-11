var $ = require('jquery');
var _ = require('underscore');
var socketio = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var Backbone = require('backbone');

var views = require('./views');

var params = document.location.search.replace("?","").split("&");
var simulatorParam = _.find(params, function(item) {
  return item.match('simulator');
});
var staticParam = _.find(params, function(item) {
  return item.match('static');
});

var DashboardRouter = Backbone.Router.extend({
  routes: {
    "": function() {
      this.handleRouter('Centres');
    },
    "?simulator": function() {
      this.handleRouter('Centres');
    },
    "?simulator&static": function() {
      this.handleRouter('Centres');
    },
    "availability": function() {
      this.handleRouter('Centres');
    },
    "statistics": function() {
      this.handleRouter('Stats');
    },
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

  handleRouter: function(whatRoute) {
    var self = this;
    self.socket0.get('/centre', function serverResponded(payload) {
      new views[whatRoute]({
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
