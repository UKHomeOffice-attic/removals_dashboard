var Backbone = require('backbone');

var templates = require('../../generated/templates');
var models = require('../models');

module.exports = Backbone.View.extend({
  template: templates.centre,

  initialize: function(options) {
    this.socket = options.socket;

    this.model = new models.Centre([], options);

    this.model.on('change',this.render, this);
  },

  render: function() {
    this.$el.empty();

    this.$el.append(this.template.render(this.model.toJSON(), {
      bed: templates.bed,
    }));
  }
});
