import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-bedspacemanagement/tests/helpers/start-app';
/*jshint unused:false*/
import { SocketIO, Server } from 'ember-bedspacemanagement/helpers/mock-socket';

let application;

module('Acceptance | application', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
