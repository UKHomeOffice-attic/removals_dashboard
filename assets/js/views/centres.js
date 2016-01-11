var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var templates = require('../../generated/templates');

var viewCentre = require('./centre');

module.exports = Backbone.View.extend({
  template: templates.centres,

  initialize: function(options) {
    this.socket = options.socket;
    this.payload = options.payload;
    this.render();

    var self = this;

    _.each(this.payload.data, function(item,idx) {

      var thisViewCentre = new viewCentre({
        socket: self.socket,
        id: 'centre_'+idx
      });
      self.$el.append(thisViewCentre.el);
      thisViewCentre.model.set(item);

    })
  },

  render: function() {
    this.$el.html(this.template.render());
  }
});
