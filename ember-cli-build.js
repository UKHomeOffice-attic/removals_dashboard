/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  app.import('bower_components/socket.io-client/socket.io.js');
  app.import('bower_components/sails.io.js/sails.io.js');

  return app.toTree();
};
