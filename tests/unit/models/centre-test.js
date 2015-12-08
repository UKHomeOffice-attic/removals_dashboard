import { moduleForModel, test } from 'ember-qunit';

moduleForModel('centre', 'Unit | Model | centre', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
