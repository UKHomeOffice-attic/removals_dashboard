import Ember from 'ember';
import SailsIoInitializer from '../../../initializers/sails-io';
import { module, test } from 'qunit';

let app;
let container;

module('Unit | Initializer | sails io', {
  beforeEach() {
    Ember.run(function() {
      app = Ember.Application.create();
      app.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  SailsIoInitializer.initialize(container, app);

  assert.ok(true);
});
