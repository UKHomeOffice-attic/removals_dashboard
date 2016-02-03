import ENV from '../config/environment';
import sailsIOClient from "npm:sails.io.js";
import socketIOClient from "npm:socket.io-client";

export default {
  name: 'sails-io',
  initialize: function(container, app) {
    var io = sailsIOClient(socketIOClient);
    io.sails.url = ENV.apiURL;
    io.sails.transports = ['polling'];

    io.sails.query = io.sails.query || {};
    for(var sdkInfoKey in io.sails.sdk) {
      io.sails.query['__sails_io_sdk_' + sdkInfoKey] = io.sails.sdk[sdkInfoKey];
    }
    app.register('io:main', io, {instantiate: false});
    app.inject('route', 'io', 'io:main');
    app.inject('adapter', 'io', 'io:main');
  }
};
