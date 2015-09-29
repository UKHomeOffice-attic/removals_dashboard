var expect = require('expect.js');
var models = require('../assets/js/models');

describe('centres model', function() {
  it('should have a urlRoot', function() {
    var model = new models.centres();
    expect(model.urlRoot).to.equal('/centres');
  });
});
