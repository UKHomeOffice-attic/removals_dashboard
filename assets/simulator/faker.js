var _ = require('underscore');

var centres = [null,'First','Second','Third'];

var beds = function(type) {
  return {
    type: type,
    capacity: _.random(0,100),
    booked: _.random(0,20),
    prebooked: _.random(0,10),
    ooc: _.random(0,10)
  }
};

module.exports = {
  Centre: function(centre) {
    return {
      name: centres[centre],
      centre_id: centre,
      beds: [ beds('male'), beds('female')],
      links: [{
        rel: "self",
        href: "centre/"+centre
      },{
        rel: "events",
        href: "centre/"+centre+"/events"
      },{
        rel: "bookings",
        href: "centre/"+centre+"/bookings"
      },{
        rel: "prebookings",
        href: "centre/"+centre+"/prebookings"
      }]
    }
  }
};
