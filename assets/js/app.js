var $ = require('jquery');
var _ = require('underscore');

var view = require('./views/dashboard');

// example of adding jQ tabs plugin
//var tabs = require('./vendor/jquery.tabs');
//var x = $('h1');
//console.log(x.tabs);

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
