var expect = require('expect.js');
var _ = require('underscore');
var socket = require('socket-io-mock');
var sailsIOClient = require('sails.io.js');
var sinon = require('sinon');

var models = require('../assets/js/models');
var faker = require('../assets/simulator/faker');

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

    it('should calculate overall booked', function(done) {
      var model = new models.Centre();
      var data = [{
        booked: 10
      },{
        booked: 13
      }];

      model.on('change', function() {
        expect(model.get('booked')).to.be(23);
        return done();
      });

      model.set('beds',data);
    });

    it('should calculate overall prebooked', function(done) {
      var model = new models.Centre();
      var data = [{
        prebooked: 50
      },{
        prebooked: 20
      }];

      model.on('change', function() {
        expect(model.get('prebooked')).to.be(70);
        return done();
      });

      model.set('beds',data);
    });

    it('should calculate male available beds', function(done) {
      var model = new models.Centre();
      var data = [{
        type: 'male',
        capacity: 100,
        booked: 10,
        prebooked: 50,
        ooc: 5
      }];

      model.on('change', function() {
        expect(model.get('male_available')).to.be(35);
        return done();
      });

      model.set('beds',data);
    });

    it('should calculate female available beds', function(done) {
      var model = new models.Centre();
      var data = [{
        type: 'female',
        capacity: 100,
        booked: 10,
        prebooked: 50,
        ooc: 5
      }];

      model.on('change', function() {
        expect(model.get('female_available')).to.be(35);
        return done();
      });

      model.set('beds',data);
    });

    it('should calculate all available beds', function(done) {
      var model = new models.Centre();
      // get all male and female beds into seperate array
      var data = [{
        type: 'female',
        capacity: 100,
        booked: 10,
        prebooked: 50,
        ooc: 5
      },{
        type: 'male',
        capacity: 100,
        booked: 10,
        prebooked: 50,
        ooc: 5
      }];

      model.on('change', function() {
        expect(model.get('all_available')).to.be(70);
        return done();
      });

      model.set('beds',data);
    });

    it('should subscribe to updates when centre_id is set', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });
      var testSinon = sinon.spy(model.socket._raw, 'emit');
      model.on('change', function() {
        expect(testSinon.calledWith("subscribe")).to.be(true);
        return done();
      })
      model.set('centre_id', 1);
    });

    it('should respond to centre data being updated', function(done) {
      var model = new models.Centre([], { socket: this.socket0 });
      model.on('change:name', function() {
        expect(model.get('name')).to.be("first");
        return done();
      })
      model.set('centre_id', 1);
      this.server.emit('centre_id/1', {
        name: 'first'
      })
    })

  });
});
