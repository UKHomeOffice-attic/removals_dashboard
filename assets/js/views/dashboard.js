var Backbone = require('backbone');
var _ = require('underscore');

var model = require('../models/centre');
var templates = require('../templates');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = Backbone.View.extend({
  el: '#centres',
  model: new model(),
  template: _.template(templates.centre),

  initialize: function() {
    var $this = this;
    this.model.on('change',this.render, this);
    this.model.fetch();

    setInterval(function(){
      $this.model.fetch();
    },3000);
  },

  render: function() {
    this.$el.empty();

    _.each(this.model.attributes, function(item) {
      item.booked_and_reserved = item.booked + item.reserved;
      this.$el.append(this.template(item));
    }, this)
  }
});
