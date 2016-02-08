import Ember from 'ember';

export default Ember.Component.extend({
  showDetails: false,
  actions: {
    toggleDetails: function () {
      this.set('showDetails', !this.get('showDetails'));
    }
  },
  isFull: Ember.computed('availability', function () {
    return this.get('availability') <= 0;
  }),
  formattedAvailability: Ember.computed('availability', function () {
    return this.get('availability') === 0 ? "FULL" : this.get('availability');
  }),
  display: Ember.computed('capacity', function () {
    return this.get('capacity') > 0;
  })
});
