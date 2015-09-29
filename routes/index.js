var express = require('express');
var router = express.Router();
var appRoutes = require('./appRoutes');


/* GET home page. */
router.get('/', appRoutes['/'].fn);

module.exports = router;
