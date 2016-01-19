/**
 * @file Factory definition for centres
 * To seed our database with fake data. Factories are objects that dynamically generate data - blueprints for database
 * records. Faker ships with Mirage, used to generate random quantities for our available centres.
 */
import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) {
    return 'Centre ' + i;
  },
  updated: '12:12:12',
  maleCapacity: 500,
  femaleCapacity: 500,
  maleInUse: faker.list.random(450, 475, 480, 490, 495, 500),
  femaleInUse: 4,
  maleOutOfCommission: faker.list.random(5, 10, 15, 20, 35, 50),
  femaleOutOfCommission: faker.list.random(5, 10, 15, 20, 35, 50)
});
