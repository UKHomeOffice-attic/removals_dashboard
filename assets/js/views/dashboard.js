var Backbone = require('backbone');
var _ = require('underscore');

var collection = require('../collections/centres');
var templates = require('../../generated/templates');

module.exports = Backbone.View.extend({
  el: '#centres',
  template: templates.centre,

  initialize: function(options) {
    this.collection = new collection({},options);

    this.collection.on('add',this.render, this);
    this.collection.fetch();

    setInterval(this.poll.bind(this),1000);
  },

  poll: function() {
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();

    _.each(this.collection.models, function(model) {
      model.set('booked_and_reserved', model.get('booked') + model.get('reserved'));

      this.$el.append(this.template.render(model.toJSON(), {
        bed: templates.bed
      }));
    }, this)
  }
});
