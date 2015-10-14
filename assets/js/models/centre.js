var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'centres.json',
  defaults: {
    name: undefined,
    centre_id: undefined,
    beds: [],
    booked: 0,
    reserved: 0
  },

  initialize: function(attributes, options) {
    this.socket = null;
    var $this = this;

    if (options && options.socket) this.socket = options.socket;

    if (this.socket) {
      this.socket.on('populate', function(payload) {
        $this.set(payload);
      });
    }

  }
});
