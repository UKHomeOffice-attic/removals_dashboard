var expect = require('expect.js');
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

  });

  it('should work', function(done) {
    var io = sailsIOClient(this.fakeio(this.server));

    io.sails.autoConnect = false;

    var socket0 = io.sails.connect();

    socket0.on('message',function(payload) {
      expect(payload).to.be('test message');
      done();
    });

    this.server.emit('message', 'test message');
  });
});
