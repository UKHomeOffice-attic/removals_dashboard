var expect = require('expect.js');
var add = require('../public/js/app');

describe('add()', function() {
  it('should return 2 when you pass it 1, 1', function() {
    expect(add(1, 1)).to.equal(2);
  });
});
