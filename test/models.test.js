var expect = require('expect.js');
var _ = require('underscore');

var models = require('../assets/js/models');

describe('collections', function () {
  describe('centres', function() {
    it('should be instantiated', function() {
      var collection = new collections.Centres();

      expect(collection).not.to.be(undefined);
    });
  });
});

describe('models', function() {
  describe('centre', function() {

  });
});
