/**
 * @file RESTAdapter implementation.
 * Ember CLI Mirage 0.1.x exposes a REST API and Ember Data should be aware. Sole purpose is to define the path on the
 * server where we can find our RESTful service.
 *
 * If required at a later stage add attribute namespace: 'api'
 */
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS. JSONAPIAdapter.extend({
  host: ENV.apiURL,
  ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});
