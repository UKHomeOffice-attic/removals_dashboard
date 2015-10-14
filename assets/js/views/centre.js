var Backbone = require('backbone');

var socket = require('socket-io-mock');
var sailsIOClient = require('sails.io.js');

var templates = require('../../generated/templates');
var models = require('../models');

module.exports = Backbone.View.extend({
  el: '#centres',
  template: templates.centre,

  initialize: function(options) {
    //console.log(options);

    var io = sailsIOClient(options.socket);

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    this.model = new models.Centre([], { socket: socket0 });

    this.model.on('change',this.render, this);
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
