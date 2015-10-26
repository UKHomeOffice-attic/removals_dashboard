var expect = require('chai').expect;
var socket = require('socket-io-mock');
var sailsIOClient = require('sails.io.js');

describe('sails.io client', function() {
  beforeEach(function() {

    this.server = new socket();
    this.fakeio = function(server) {
      return function() {
        return server.socketClient;
      }
    };

    // ensure the fake socket is 'connected' so that sails.io doesn't indefinitely queue its requests
    this.server.socketClient.connected = true;

  });

  it('should work', function(done) {
    var io = sailsIOClient(this.fakeio(this.server));

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    socket0.on('message',function(payload) {
      expect(payload).to.eql('test message');
      done();
    });

    this.server.emit('message', 'test message');
  });

  it('should respond to sails.io get messages', function(done) {
    var io = sailsIOClient(this.fakeio(this.server));

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    this.server.on('get', function(payload) {
      return {
        body: 'response body'
      };
    });

    socket0.get('/centre', function(body) {
      expect(body).to.eql('response body');
      done();
    });

  });

  it('should respond to sails.io post messages', function(done) {
    var io = sailsIOClient(this.fakeio(this.server));

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    this.server.on('post', function(payload) {
      return {
        body: 'response body'
      };
    });

    socket0.post('/centre', function(body) {
      expect(body).to.eql('response body');
      done();
    });

  });

});
