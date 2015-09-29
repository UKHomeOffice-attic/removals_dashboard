//var firebase = require('firebase');
//var myFirebaseRef = new firebase("https://amber-torch-1333.firebaseio.com/");

var indexData = {
    centres: [{
        name: 'Heathrow',
        centre_id: 1,
        full_capacity: 300,
        male_capacity: 180,
        female_capacity: 120,
        current_male_beds: 40,
        current_female_beds: 35
    },{
        name: 'Colnbrook',
        centre_id: 2,
        full_capacity: 200,
        male_capacity: 80,
        female_capacity: 120,
        current_male_beds: 50,
        current_female_beds: 15
    },{
        name: 'Harmandsworth',
        centre_id: 3,
        full_capacity: 250,
        male_capacity: 180,
        female_capacity: 70,
        current_male_beds: 20,
        current_female_beds: 100
    }]
};

var appRoutes = {
    "/": {
        method: 'get',
        fn: function(req, res) {
            res.render('index', {title: 'Express', data: indexData});
        }
    }
};

module.exports = appRoutes;
