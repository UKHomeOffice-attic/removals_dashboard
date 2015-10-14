var Backbone = require('backbone');
var _ = require('underscore');

var socket = require('socket-io-mock');
var sailsIOClient = require('sails.io.js');

var templates = require('../../generated/templates');
var models = require('../models');

module.exports = Backbone.View.extend({
  el: '#centres',
  template: templates.centre,

  initialize: function() {
    var server = new socket();
    var fakeio = function(server) {
      return function() {
        return server.socketClient;
      }
    };

    var io = sailsIOClient(fakeio(server));

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    this.model = new models.Centre([], { socket: socket0 });

    this.model.on('change',this.render, this);

    server.emit('populate', {
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
    });

    setInterval(function() {
      server.emit('populate', {
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
      });
    },1000);
  },

  render: function() {
    this.$el.empty();

    this.$el.append(this.template.render(this.model.toJSON(), {
      bed: templates.bed,
      booked: templates.booked,
      reserved: templates.reserved,
      latest: templates.latest,
      tabContent: templates.tabbed
    }));
  }
});
