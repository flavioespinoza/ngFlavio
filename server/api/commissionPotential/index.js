/**
 * Created by Flavor on 12/27/15.
 */
var express = require('express');
var controller = require('./commissionPotential.controller.js');

var router = express.Router();

router.post('/', controller.newCommissionPotential);
router.get('/:activeSalesRepId', controller.getCommissionPotential);

module.exports = router;
