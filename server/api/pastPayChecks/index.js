/**
 * Created by Flavor on 12/18/15.
 */
var express = require('express');
var controller = require('./pastPayChecks.controller.js');

var router = express.Router();

router.post('/newPayCheck', controller.newPayCheck);
router.get('/:payCheckId', controller.getPayCheckById);
router.post('/findPayCheckByPayPeriod', controller.findPayCheckByPayPeriod);

module.exports = router;
