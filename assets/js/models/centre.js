var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'centres.json',
  defaults: {
    "bedcount": 0
  },

  initialize: function(attributes, options) {
    this.socket = null;
    var $this = this;

    if (options && options.socket) this.socket = options.socket;

    if (this.socket) {
      this.socket.on('bedcount', function(payload) {
        $this.set('bedcount', payload.beds);
      });
    }

  }
});
