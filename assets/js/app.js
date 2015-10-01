var $ = require('jquery');
var _ = require('underscore');

var view = require('./views/dashboard');

$(function() {
  var options = {};
  var params = document.location.search.replace("?","").split("&");
  var endpointParam = _.find(params, function(item) {
    return item.match('endpoint');
  });

  if (endpointParam) {
    options.url = endpointParam.split("=")[1];
  }

  new view(options);
});
