var Backbone = require('backbone');
var _ = require('underscore');
var model = require('../models/centres');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = Backbone.View.extend({
  el: '#centres',
  model: new model(),
  template: _.template("Centre: {{name}}"),

  initialize: function() {
    this.model.on('change',this.render, this);

    this.model.fetch()
  },

  render: function() {
    _.each(this.model.get('centres'), function(item) {
      this.$el.append(this.template(item));
    }, this)
  }
});
