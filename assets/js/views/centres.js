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

      self.$el.append('<div class="centre_data" id="centre_'+idx+'"></div>');
      var thisViewCentre = new viewCentre({
        el: '#centre_'+idx,
        socket: self.socket
      });
      thisViewCentre.model.set(item);
    })
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template.render());
  }
});
