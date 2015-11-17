var Backbone = require('backbone');

var templates = require('../../generated/templates');
var models = require('../models');

module.exports = Backbone.View.extend({
  template: templates.stat,

  initialize: function(options) {
    this.socket = options.socket;

    this.model = new models.Centre([], options);

    this.model.on('change',this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template.render(this.model.toJSON(), {
      stat: templates.stat,
    }));
  }
});
