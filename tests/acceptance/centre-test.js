import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-bedspacemanagement/tests/helpers/start-app';

let application;

module('Acceptance | centres', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Default Scenario: ', function(assert) {
  server.createList('centre', 3);

  visit('/');

  andThen(function() {
    assert.equal(find('.centre').length, 3, 'The Homepage should display 3 centres');
  });
});

test('Default Scenario: Show & Hide', function(assert) {
  server.createList('centre', 3);

  visit('/');

  click('.centre:first .detail-toggle');

  andThen(function() {
    assert.ok(find('.centre:first .details').length, 'The Homepage should show centres details');
  });

  click('.centre:first .detail-toggle');

  andThen(function() {
    assert.equal(find('.centre:first .details').length, 0, 'The Homepage should hide centres details');
    assert.equal(find('.centre:first .time').text(), 'Last updated: 09:35:43', 'Centre to display formated date');
  });
});

test('Male Availability Zero:', function(assert) {
  server.create('centre', {maleAvailability: 0});

  visit('/');

  andThen(function() {
    assert.equal(find('.centre:first .Male .availability.highlight').text(), 'FULL', 'The centre should display FULL');
    assert.equal(find('.centre:first .Male .status').text(), 'No Available Male Beds', 'The centre status to update');
  });

});

test('Female Availability Zero:', function(assert) {
  server.create('centre', {femaleAvailability: 0});

  visit('/');

  andThen(function() {
    assert.equal(find('.centre:first .Female .availability.highlight').text(), 'FULL', 'The centre should display FULL');
    assert.equal(find('.centre:first .Female .status').text(), 'No Available Female Beds', 'The centre status to update');
  });
});



