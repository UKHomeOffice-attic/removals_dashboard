import DS from 'ember-data';

/**
 * Models our centre object.
 *  This class relies on the Ember Data libraries to create an instance of a Model, with a multiple attributes.
 */
export default DS.Model.extend({
  name: DS.attr('string'),
  updated: DS.attr(),
  maleCapacity: DS.attr('number'),
  femaleCapacity: DS.attr('number'),
  maleInUse: DS.attr('number'),
  femaleInUse: DS.attr('number'),
  maleOutOfCommission: DS.attr('number'),
  femaleOutOfCommission: DS.attr('number'),
  maleAvailability: Ember.computed('maleCapacity', 'maleInUse', 'maleOutOfCommission', function() {
    return this.get('maleCapacity') - this.get('maleInUse') - this.get('maleOutOfCommission');
  }),
  femaleAvailability: Ember.computed('femaleCapacity', 'femaleInUse', 'femaleOutOfCommission', function() {
    return this.get('femaleCapacity') - this.get('femaleInUse') - this.get('femaleOutOfCommission');
  })
});