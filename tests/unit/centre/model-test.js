import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('centre', 'Unit | Model | centre', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let centre = this.subject();
  // let store = this.store();
  assert.ok(!!centre);
});

test('femaleAvailability is computed', function(assert) {
  // this.subject aliases the createRecord method on the model
  let centre = this.subject({
    femaleCapacity: 500,
    femaleInUse: 435,
    femaleOutOfCommission: 5
  });

  // wrap asynchronous call in run loop
  Ember.run(function() {
    centre.femaleAvailability();
  });

  assert.equal(centre.get('femaleAvailability'), 60);
});

test('maleAvailability is computed', function(assert) {
  // this.subject aliases the createRecord method on the model
  let centre = this.subject({
    maleCapacity: 500,
    maleInUse: 475,
    maleOutOfCommission: 15
  });

  // wrap asynchronous call in run loop
  Ember.run(function() {
    centre.maleAvailability();
  });

  assert.equal(centre.get('maleAvailability'), 10);
});
