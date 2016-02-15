import Ember from 'ember';
import initializer from '../../../initializers/server-env-variables';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | server env variables', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it sets environment.apiURL', function(assert) {
  window.config.backend = 'be';
  let result = initializer.initialize(application);

  assert.ok(result.apiURL === 'be');
});


test('it sets environment.keycloakAccountService', function(assert) {
  window.config.keycloakAccountService = 'kas';
  let result = initializer.initialize(application);

  assert.ok(result.keycloakAccountService === 'kas');
});
