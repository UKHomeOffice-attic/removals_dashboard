var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var tabs = require('../vendor/jquery.tabs');
var collection = require('../collections/centres');
var templates = require('../../generated/templates');

module.exports = Backbone.View.extend({
  el: '#centres',
  template: templates.centre,

  initialize: function(options) {
    this.collection = new collection({},options);

    this.collection.on('update',this.render, this);
    this.collection.fetch();
  },

  poll: function() {
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();

    _.each(this.collection.models, function(model) {
      model.set('booked_and_reserved', model.get('booked') + model.get('reserved'));

      this.$el.append(this.template.render(model.toJSON(), {
        bed: templates.bed,
        booked: templates.booked,
        reserved: templates.reserved,
        latest: templates.latest,
        tabContent: templates.tabbed
      }));
    }, this);

    var $container = $('section.tabstuff');



    if ($container.find('.js-tabs').length) {
      $.each($container,function(index,div){
          //$(div).css("background-color","yellow");
          $(div).tabs({
            scrollOnload: true,
            trackState: false
          });
      });

    }

  }
});
