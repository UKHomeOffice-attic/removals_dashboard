var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var templates = require('../../generated/templates');

var viewStat = require('./stat');

module.exports = Backbone.View.extend({
  template: templates.stats,

  initialize: function(options) {
    this.socket = options.socket;
    this.payload = options.payload;
    this.render();

    var self = this;
    _.each(this.payload.data, function(item,idx) {
      self.$el.append('<div class="stat_data" id="centre_'+idx+'"></div>');
      var thisViewStat = new viewStat({
        el: '#centre_'+idx,
        socket: self.socket
      });
      thisViewStat.model.set(item);
    })
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template.render());
  }
});
