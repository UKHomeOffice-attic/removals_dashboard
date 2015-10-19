var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  urlRoot: 'centres.json',

  initialize: function(attributes, options) {
    this.socket = null;
    var $this = this;

    if (options && options.socket) this.socket = options.socket;

    this.on('change:beds', this.calculateCapacities, this);
    this.on('change:centre_id', this.subscribeToCentre, this);
  },

  calculateCapacities: function() {
    var beds = this.get('beds');

    var male_beds = _.find(beds, function(item) {
      return item.type === 'male';
    });

    var female_beds = _.find(beds, function(item) {
      return item.type === 'female';
    });

    var all_beds = 0;

    this.set('capacity', _.reduce(beds, function(memo, item){
      return memo + item.capacity;
    }, 0));

    this.set('booked', _.reduce(beds, function(memo, item){
      return memo + item.booked;
    }, 0));

    this.set('prebooked', _.reduce(beds, function(memo, item){
      return memo + item.prebooked;
    }, 0));

    if (male_beds) {
      this.set('male_available', male_beds.capacity - (male_beds.booked + male_beds.prebooked + male_beds.ooc));
      all_beds = (male_beds.capacity - (male_beds.booked + male_beds.prebooked + male_beds.ooc));
    }
    if (female_beds) {
      this.set('female_available', female_beds.capacity - (female_beds.booked + female_beds.prebooked + female_beds.ooc));
      all_beds += (female_beds.capacity - (female_beds.booked + female_beds.prebooked + female_beds.ooc));
    }

    this.set('all_available', all_beds);
  },

  subscribeToCentre: function() {
    var self = this;
    this.socket.on('centre_id/' + this.get('centre_id'), function(payload) {
      self.set(payload);
    });
    this.socket._raw.emit('subscribe', this.get('centre_id'));
  }

});
