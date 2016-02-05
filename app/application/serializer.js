/**
 * @file JSONAPISerializer implementation.
 *  The serializer takes the attributes defined in the relevant Ember model and converts them to match the JSON string
 * returned from the backend.
 *
 * keyForAttribute currently matches what is received from the Sails API: camelCase, as the default is hyphened Key
 * Attributes, which is not consistent with jsonapi.org.
 */
import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  camelize: Ember.String.camelize,

  keyForAttribute: function(attr) {
    return this.camelize(attr);
  },

  keyForRelationship: function(rawKey) {
    return this.camelize(rawKey);
  },

  pushPayload: function() {

  }
});

