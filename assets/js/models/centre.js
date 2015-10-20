var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  initialize: function(attributes, options) {
    this.socket = null;

    if (options && options.socket) this.socket = options.socket;

    this.on('change:beds', this.calculateCapacities, this);
    this.on('change:centre_id', this.subscribeToCentre, this);
  },

  calculateCapacities: function() {
    var beds = this.get('beds');

    this.set('beds', _.map(beds, function(item) {
      item.available = item.capacity - (item.occupied + item.ooc);
      item.plurality = "s";
      if (item.available === 1) {
        item.plurality = "";
      };
      return item;
    }));

    this.set('capacity', _.reduce(beds, function(memo, item){
      return memo + item.capacity;
    }, 0));

    this.set('booked', _.reduce(beds, function(memo, item){
      return memo + item.booked;
    }, 0));

    this.set('prebooked', _.reduce(beds, function(memo, item){
      return memo + item.prebooked;
    }, 0));

    this.set('all_available', _.reduce(beds, function(memo, item){
      return memo + item.available;
    }, 0));
  },

  subscribeToCentre: function() {
    var self = this;

    this.socket.on('centre_id/' + this.get('centre_id'), function(payload) {
      self.set(payload);
    });
  }

});
