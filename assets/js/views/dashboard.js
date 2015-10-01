var Backbone = require('backbone');
var _ = require('underscore');

var collection = require('../collections/centres');
var templates = require('../templates');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = Backbone.View.extend({
  el: '#centres',
  collection: new collection(),
  template: _.template(templates.centre),

  initialize: function() {
    var $this = this;

    this.collection.on('add',this.render, this);
    this.collection.fetch();

    //setInterval(function(){
    //  $this.model.fetch();
    //},3000);
  },

  render: function() {
    this.$el.empty();

    _.each(this.collection.models, function(model) {
      model.set('booked_and_reserved', model.get('booked') + model.get('reserved'));
      this.$el.append(this.template(model.toJSON()));
    }, this)
  }
});
