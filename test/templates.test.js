var expect = require('expect.js');
var _ = require('underscore');

var templates = require('../assets/generated/templates');

describe('templates', function() {
  describe('centres', function() {
    it('should render the centre template correctly with data', function() {
      var output = templates.centre.render({name: 'Heathrow',male_available: 0, female_available: 0, booked_and_reserved: 0});

      expect(output).to.contain('<h2>Heathrow</h2>');
      expect(output).to.contain('<span class=\'bed-count-figure\'>0</span> <span class=\'bed-count-label\'>male beds available</span>');
      expect(output).to.contain('<span class=\'bed-count-figure\'>0</span> <span class=\'bed-count-label\'>female beds available</span>');
      expect(output).to.contain('<span class=\'bed-count-figure\'>0</span> <span class=\'bed-count-label\'>beds booked and reserved</span>');

    });
  });
});
