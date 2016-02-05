/**
 * @file Models our centre object.
 *  This class relies on the Ember Data libraries to create an instance of a Model, with a multiple attributes.
 */
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  heartbeatRecieved: DS.attr(),
  maleCapacity: DS.attr('number'),
  femaleCapacity: DS.attr('number'),
  maleInUse: DS.attr('number'),
  femaleInUse: DS.attr('number'),
  maleOutOfCommission: DS.attr('number'),
  femaleOutOfCommission: DS.attr('number'),
  maleAvailability: DS.attr('number'),
  femaleAvailability: DS.attr('number')
});
