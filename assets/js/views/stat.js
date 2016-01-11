var Backbone = require('backbone');

var templates = require('../../generated/templates');
var models = require('../models');

module.exports = Backbone.View.extend({
  template: templates.stat,
  className: 'stat_data',

  initialize: function(options) {
    this.socket = options.socket;

    this.id = options.id;

    this.model = new models.Centre([], options);

    this.model.on('change',this.render, this);
  },

  render: function() {
    this.$el.empty();

    this.$el.html(this.template.render(this.model.toJSON(), {
      stat: templates.stat,
    }));
  }
});