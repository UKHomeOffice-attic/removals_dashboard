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

      var thisViewStat = new viewStat({
        socket: self.socket,
        id: 'centre_'+idx
      });

      thisViewStat.model.set(item);
      self.$el.append(thisViewStat.el);

    })
  },

  render: function() {
    this.$el.html(this.template.render());
  }
});
