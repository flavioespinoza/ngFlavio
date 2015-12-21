/**
 * Created by Flavor on 12/18/15.
 */
var express = require('express');
var controller = require('./currentCommissionDetails.controller.js');

var router = express.Router();

router.get('/:activeSalesRepId', controller.getCurrentCommissionDetails);

module.exports = router;
