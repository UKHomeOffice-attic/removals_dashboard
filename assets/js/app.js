var $ = require('jquery');
var lib = require('./lib');

$(function() {
  console.log(lib.add(1,1));

  var model = new lib.centresModel();

  console.log(model.get('centreCount'));


});
