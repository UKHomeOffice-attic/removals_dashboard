var expect = require('expect.js');
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
      return expect(model).not.to.be(undefined);
    });

    it('should respond to socket events', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });

      model.socket.on('message', function(payload) {
        expect(payload).to.be('test message');
        return done();
      });

      this.server.emit('message','test message');
    });

    it('should calculate overall capacity', function(done) {
      var model = new models.Centre();
      var data = [{
        capacity: 100
      },{
        capacity: 150
      }];

      model.on('change', function() {
        expect(model.get('capacity')).to.be(250);
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

        expect(male_beds.available).to.be(55);
        return done();
      });

      model.set('beds',data);
    });

    it('should check whether there is only 1 male bed', function(done) {
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

        expect(male_beds.available).to.be(1);
        expect(male_beds.plurality).to.be("");
        return done();
      });

      model.set('beds',data);
    });

    it('should check whether there are only 2 male beds', function(done) {
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

        expect(male_beds.available).to.be(2);
        expect(male_beds.plurality).to.be("s");
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

        expect(female_beds.available).to.be(55);
        return done();
      });

      model.set('beds',data);
    });

    it('should check whether there is only 1 female bed', function(done) {
      var model = new models.Centre();
      var data = [{
        type: 'female',
        capacity: 100,
        occupied: 95,
        ooc: 4
      }];

      model.on('change', function() {
        var female_beds = _.find(model.get('beds'), function(item) {
          return item.type === "female"
        });

        expect(female_beds.available).to.be(1);
        expect(female_beds.plurality).to.be("");
        return done();
      });

      model.set('beds',data);
    });

    it('should check whether there are only 2 female beds', function(done) {
      var model = new models.Centre();
      var data = [{
        type: 'female',
        capacity: 100,
        occupied: 95,
        ooc: 3
      }];

      model.on('change', function() {
        var female_beds = _.find(model.get('beds'), function(item) {
          return item.type === "female"
        });

        expect(female_beds.available).to.be(2);
        expect(female_beds.plurality).to.be("s");
        return done();
      });

      model.set('beds',data);
    });

    it('should calculate all available beds', function(done) {
      var model = new models.Centre();
      // get all male and female beds into separate array
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
        expect(model.get('all_available')).to.be(110);
        return done();
      });

      model.set('beds',data);
    });

    it('should respond to centre data being updated', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });
      model.on('change:name', function() {
        expect(model.get('name')).to.be("first");
        return done();
      });

      model.set('centre_id', 1);

      this.server.emit('centre_id/1', {
        name: 'first'
      });
    })

  });
});
