var Backbone = require('backbone');
var model = require('../models/centre');

module.exports = Backbone.Collection.extend({
  url: 'centres.json',
  model: model,

  initialize: function(models,options) {
    if (options && options.url) this.url = options.url;
  }
});
