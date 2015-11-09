var expect = require('chai').expect;
var _ = require('underscore');
var socket = require('socket-io-mock');
var sailsIOClient = require('sails.io.js');

var models = require('../assets/js/models');

describe('models', function() {
  describe('centre', function() {
    beforeEach(function() {
      var io;

      this.server = new socket();
      this.fakeio = function(server) {
        return function() {
          return server.socketClient;
        }
      };

      io = sailsIOClient(this.fakeio(this.server));
      io.sails.autoConnect = false;

      this.socket0 = io.sails.connect();
    });

    it('should be instantiated', function() {
      var model = new models.Centre();
      return expect(model).to.not.be.undefined;
    });

    it('should respond to socket events', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });

      model.socket.on('message', function(payload) {
        expect(payload).to.eql('test message');
        return done();
      });

      this.server.emit('message','test message');
    });

    it('should hold a human readable date', function(done) {
      var model = new models.Centre();

      model.on('change:updated', function() {
        expect(model.get('updated_formatted')).to.eql('17:26');
        return done();
      });

      model.set('updated', '2015-10-23T17:26:00');

    });

    it('should respond to centre data being updated', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });
      model.on('change:name', function() {
        expect(model.get('name')).to.eql("first");
        return done();
      });

      model.set('centre_id', 1);

      this.server.emit('centre_id/1', {
        name: 'first'
      });
    });

    describe('capacity', function() {
      it('should calculate overall capacity', function(done) {
        var model = new models.Centre();
        var data = [{
          capacity: 100
        },{
          capacity: 150
        }];

        model.on('change', function() {
          expect(model.get('capacity')).to.eql(250);
          return done();
        });

        model.set('beds',data);

      });
    });

    describe('availability', function() {
      it('should calculate overall available beds', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'female',
          capacity: 100,
          occupied: 40,
          ooc: 5
        },{
          type: 'male',
          capacity: 100,
          occupied: 40,
          ooc: 5
        }];

        model.on('change', function() {
          expect(model.get('all_available')).to.eql(110);
          return done();
        });

        model.set('beds',data);
      });

      it('should calculate male available beds', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'male',
          capacity: 100,
          occupied: 40,
          ooc: 5
        }];

        model.on('change', function() {
          var male_beds = _.find(model.get('beds'), function(item) {
            return item.type === "male"
          });

          expect(male_beds.available).to.eql(55);
          return done();
        });

        model.set('beds',data);
      });

      it('should calculate female available beds', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'female',
          capacity: 100,
          occupied: 40,
          ooc: 5
        }];

        model.on('change', function() {
          var female_beds = _.find(model.get('beds'), function(item) {
            return item.type === "female"
          });

          expect(female_beds.available).to.eql(55);
          return done();
        });

        model.set('beds',data);
      });

      it('should set correct plurality when there is only 1 bed', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'male',
          capacity: 100,
          occupied: 95,
          ooc: 4
        }];

        model.on('change', function() {
          var male_beds = _.find(model.get('beds'), function(item) {
            return item.type === "male"
          });

          expect(male_beds.plurality).to.eql("");
          return done();
        });

        model.set('beds',data);
      });

      it('should set correct plurality when there are 2 beds', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'male',
          capacity: 100,
          occupied: 95,
          ooc: 3
        }];

        model.on('change', function() {
          var male_beds = _.find(model.get('beds'), function(item) {
            return item.type === "male"
          });

          expect(male_beds.plurality).to.eql("s");
          return done();
        });

        model.set('beds',data);
      });

      it('should set correct plurality when there are 0 beds', function(done) {
        var model = new models.Centre();
        var data = [{
          type: 'male',
          capacity: 100,
          occupied: 100,
          ooc: 0
        }];

        model.on('change', function() {
          var male_beds = _.find(model.get('beds'), function(item) {
            return item.type === "male"
          });

          expect(male_beds.plurality).to.eql("s");
          return done();
        });

        model.set('beds',data);
      });
    });
  });
});
