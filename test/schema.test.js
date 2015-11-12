var expect = require('chai').expect;

var generator = require('../assets/schema/generate');

describe('Schema', function() {
  it('should generate valid JSON', function() {
    var output = generator.Centre();

    expect(output).to.have.keys(['verb','id','data']);
    expect(output.data[0]).to.have.keys(['name','centre_id','updated','beds','links']);
  });

  it('should generate valid JSON with a specific centre ID when one is given', function() {
    var output = generator.Centre(99);

    expect(output.id).to.eql(99);
  });
});
