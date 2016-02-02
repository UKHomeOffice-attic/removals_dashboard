import Ember from 'ember';
import KeycloakRedirectInitializer from '../../../initializers/keycloak-redirect';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | keycloak redirect', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
      var window = {
        keycloakRedirect: {
          authenticate: () => {}
        }
      };
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  console.log(window);
  KeycloakRedirectInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
