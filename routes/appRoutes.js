//var firebase = require('firebase');
//var myFirebaseRef = new firebase("https://amber-torch-1333.firebaseio.com/");

var indexData = {
  centres: [{
    name: 'Heathrow',
    centre_id: 1,
    male_capacity: 33,
    female_capacity: 35,
    booked: 20,
    reserved: 47
  },{
    name: 'Colnbrook',
    centre_id: 2,
    male_capacity: 12,
    female_capacity: 23,
    booked: 9,
    reserved: 27
  },{
    name: 'Harmandsworth',
    centre_id: 3,
    male_capacity: 30,
    female_capacity: 20,
    booked: 0,
    reserved: 0
  }]
};

var appRoutes = {
  "/": {
    method: 'get',
    fn: function(req, res) {
      res.render('index', {title: 'Express'});
    }
  },
  "/centres": {
    method: 'get',
    fn: function(req, res) {
      res.json(indexData);
    }
  }
};

module.exports = appRoutes;
