var express = require('express');
var router = express.Router();
var appRoutes = require('./appRoutes');

/* GET centres listing. */
router.get('/', appRoutes['/centres'].fn);

module.exports = router;
