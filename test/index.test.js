var expect = require('expect.js');
var appRoutes = require('../routes/appRoutes');

describe('app routes', function() {
  describe('index', function() {
    it('returns home page data', function() {
      appRoutes['/'].fn({}, {
        render: function(data) {
          expect(data.title).to.eql('Express');
        }
      });
    })
  });
});
