var _ = require('underscore');

var centres = [null,'Campsfield','Colnbrook','Harmondsworth'];

var beds = function(type) {
  return {
    type: type,
    capacity: _.random(40,100),
    occupied: _.random(0,40),
    ooc: _.random(0,10)
  }
};

module.exports = {
  Centre: function(centre) {
    if (centre == 2) {
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
    } else {
      return {
        name: centres[centre],
        centre_id: centre,
        beds: [ beds('male') ],
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
  }
};
