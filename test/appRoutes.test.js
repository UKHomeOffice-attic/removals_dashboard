var expect = require('expect.js');
var appRoutes = require('../routes/appRoutes');

describe('app routes', function() {
  describe('index', function() {
    it('returns home page data', function() {
      appRoutes['/'].fn({}, {
        render: function(template,payload) {
          expect(template).to.equal('index');
          expect(payload.title).to.equal('Express');
          expect(payload.data.centres).to.have.length(3);
          expect(payload.data.centres[0].name).to.equal('Heathrow');
        }
      });
    })
  });
});
