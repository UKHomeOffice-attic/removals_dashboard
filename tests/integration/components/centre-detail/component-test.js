import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('centre-detail', 'Integration | Component | centre detail', {
  integration: true
});

test('it renders', function (assert) {
  this.render(hbs`{{centre-detail}}`);
  this.render(hbs`
      {{centre-detail
      gender = "Male"
      capacity = 1
      inUse = 1
      availability = 0
      outOfCommission = 1
      }}`);
  assert.ok(this.$().text().length > 1);
});

test('it shows full when availability is 0', function (assert) {
  this.render(hbs`
      {{centre-detail
      gender = "Male"
      capacity = 1
      availability = 0
      }}`);
  assert.equal(this.$(".status").text(), "No Available Male Beds");
  assert.equal(this.$(".availability").text(), "FULL");
});

test('it shows negative availability when availability is negative', function (assert) {
  this.render(hbs`
      {{centre-detail
      gender = "Male"
      capacity = 1
      availability = -1
      }}`);
  assert.equal(this.$(".status").text(), "No Available Male Beds");
  assert.equal(this.$(".availability").text(), "-1");
});

test('it shows positive availability when availability is positive', function (assert) {
  this.render(hbs`
      {{centre-detail
      gender = "Male"
      capacity = 1
      availability = 1
      }}`);
  assert.equal(this.$(".status").text(), "Available Male Beds");
  assert.equal(this.$(".availability").text(), "1");
});

test('it passes the gender through', function (assert) {
  this.render(hbs`
      {{centre-detail
      gender = "Alien"
      capacity = 1
      availability = 1
      }}`);
  assert.equal(this.$(".status").text(), "Available Alien Beds");
});

test('it should hide entirely if theres no capacity', function (assert) {
  this.render(hbs`
      {{centre-detail
      }}`);
  assert.equal(this.$('').text().trim(), '');
});
