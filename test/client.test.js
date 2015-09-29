var expect = require('expect.js');
var lib = require('../assets/js/lib');

describe('add()', function() {
  it('should return 2 when you pass it 1, 1', function() {
    expect(lib.add(1, 1)).to.equal(2);
  });
});

describe('centres model', function() {
  it('should have a urlRoot', function() {
    var model = new lib.centresModel();
    expect(model.urlRoot).to.equal('/centres');
  });
});
