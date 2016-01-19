/**
 * @file RESTSerializer implementation.
 * Ember CLI Mirage 0.1.x exposes a REST API and Ember Data should be aware. Furthermore, this implements a custom
 * Serializer by extending keyForAttribute and keyForRelationship. This does not match the JSONAPISerializer that
 * ships with Ember Data (matching the examples on http://jsonapi.org/format).
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
  }
});
