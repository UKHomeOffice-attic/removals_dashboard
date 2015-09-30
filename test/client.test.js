var expect = require('expect.js');
var _ = require('underscore');

var models = require('../assets/js/models');
var templates = require('../assets/js/templates');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

describe('centres model', function() {
  it('should have a urlRoot', function() {
    var model = new models.centres();
    expect(model.urlRoot).to.equal('/centres.json');
  });
});

describe('templates', function() {
  describe('centres', function() {
    it('should render the centre template correctly with data', function() {
      var compiled = _.template(templates.centre);
      var output = compiled({name: 'Heathrow',male_available: 0, female_available: 0});

      expect(output).to.contain('<h2>Heathrow</h2>');
      expect(output).to.contain('<span>0 male beds available</span>');
      expect(output).to.contain('<span>0 female beds available</span>');

    });
  });
});
