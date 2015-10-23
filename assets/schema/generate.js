var tv4 = require('tv4');
var _ = require('underscore');

var schema = require('../schema/');

var centres = [null,"First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth","Eleventh","Twelveth"];

var generate = function(schema, idx) {
  var json_schema_faker = require('json-schema-faker');
  var idx = idx || _.random(1,3);

  json_schema_faker.extend('faker', function(faker) {
    faker.custom = {
      hateoasUrl: function() {
        var verb = _.sample(["","events","bookings","prebookings"]);
        return faker.internet.domainWord() + '/' + idx + '/' + verb;
      },
      centreId: function() {
        return idx;
      },
      centreName: function() {
        return centres[idx];
      }
    };

    return faker;
  });

  var faked_json = json_schema_faker(schema);

  // Be sure that we've got a valid bit of fake json
  var validation_response = tv4.validateResult(faked_json, schema);
  if (validation_response.error !== null) {
    throw new Error(validation_response.error);
  }
  return faked_json;

};

module.exports = {
  Centre: function(idx) {
    return generate(schema.centre, idx);
  }
};
