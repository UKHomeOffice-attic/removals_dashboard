var Backbone = require('backbone');
var _ = require('underscore');

exports.add = function(x,y) {
  return x + y;
};

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var centresModel = exports.centresModel = Backbone.Model.extend({
  urlRoot: '/centres'
});

exports.centresView = Backbone.View.extend({
  el: '#centres',
  model: new centresModel(),
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
