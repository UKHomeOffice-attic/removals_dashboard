var Backbone = require('backbone');
var _ = require('underscore');
var model = require('../models/centres');
var templates = require('../templates');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = Backbone.View.extend({
  el: '#centres',
  model: new model(),
  template: _.template(templates.centre),

  initialize: function() {
    this.model.on('change',this.render, this);
    this.model.fetch();
  },

  render: function() {
    _.each(this.model.attributes, function(item) {
      item.booked_and_reserved = item.booked + item.reserved;
      this.$el.append(this.template(item));
    }, this)
  }
});
