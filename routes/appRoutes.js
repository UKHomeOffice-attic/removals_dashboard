var firebase = require('firebase');
var myFirebaseRef = new firebase("https://amber-torch-1333.firebaseio.com/");

var appRoutes = {
    "/": {
        method: 'get',
        fn: function(req, res) {
            myFirebaseRef.child('centres').on('value', function(snapshot) {
                res.render('index', { title: 'Express', centres: snapshot.val() });
            });
        }
    }
};

module.exports = appRoutes;
