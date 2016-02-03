/**
 * @file RESTSerializer implementation.
 * The JSONAPISerializer matches the JSONAPISerializer that ships with Ember Data (matching the examples on
 * http://jsonapi.org/format). Ember CLI Mirage 0.1.x exposes a REST API and Ember Data should be aware, regardless of
 * the Serilizer having extended functionality or not.
 */
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({});
