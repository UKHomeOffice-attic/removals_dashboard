var Backbone = require('backbone');

exports.add = function(x,y) {
  return x + y;
};

exports.centresModel = Backbone.Model.extend({
  urlRoot: '/centres'
});
