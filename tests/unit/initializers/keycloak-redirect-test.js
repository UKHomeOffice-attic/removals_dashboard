import Ember from 'ember';
import KeycloakRedirectInitializer from '../../../initializers/keycloak-redirect';
import { module, test } from 'qunit';
import sinon from 'sinon';

let application;

module('Unit | Initializer | keycloak redirect', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it calls keycloakRedirect.authenticate()', function(assert) {
  let stub = sinon.stub();
  window.keycloakRedirect = {authenticate: stub};
  KeycloakRedirectInitializer.initialize(application);
  assert.ok(stub.calledOnce);
});

test('it sets the "before" property to sails-io', function(assert){
  assert.ok(KeycloakRedirectInitializer.before === 'sails-io');
});
