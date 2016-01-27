import Ember from 'ember';
import SailsIoInitializer from '../../../initializers/sails-io';
import { module, skip } from 'qunit';

let application;

module('Unit | Initializer | sails io', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Temporarily skipped until BM-364 is done.
skip('it works', function(assert) {
  SailsIoInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
