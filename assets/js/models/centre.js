var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  urlRoot: 'centres.json',

  initialize: function(attributes, options) {
    this.socket = null;
    var $this = this;

    if (options && options.socket) this.socket = options.socket;

    if (this.socket) {
      this.socket.on('populate', function(payload) {
        $this.set(payload);
      });
    }

    this.on('change:beds', this.calculateCapacities, this);
  },

  calculateCapacities: function() {
    var beds = this.get('beds');

    var male_beds = _.find(beds, function(item) {
      return item.type === 'male';
    });

    var female_beds = _.find(beds, function(item) {
      return item.type === 'female';
    });

    this.set('capacity', _.reduce(beds, function(memo, item){
      return memo + item.capacity;
    }, 0));

    this.set('booked', _.reduce(beds, function(memo, item){
      return memo + item.booked;
    }, 0));

    this.set('prebooked', _.reduce(beds, function(memo, item){
      return memo + item.prebooked;
    }, 0));

    if (male_beds) this.set('male_available', male_beds.capacity - (male_beds.booked + male_beds.prebooked + male_beds.ooc));
    if (female_beds) this.set('female_available', female_beds.capacity - (female_beds.booked + female_beds.prebooked + female_beds.ooc));
  }

});
