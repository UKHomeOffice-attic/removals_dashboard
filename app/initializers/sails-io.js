import ENV from '../config/environment';

export default {
  name: 'sails-io',
  initialize: function(container, app) {
    var io = window.io;
    io.sails.url = ENV['apiURL'];
    io.sails.transports = ['polling'];

    app.register('io:main', io, {instantiate: false});
    app.inject('route', 'io', 'io:main');
    app.inject('adapter', 'io', 'io:main');
  }
};
