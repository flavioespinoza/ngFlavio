/***
 * Created by Flavor on 12/18/15.
 **/

var currentCommissionDetails =  require('./currentCommissionDetails.model.js');
var moment = require('moment');

exports.newCommissionDetails = function (req, res) {
  var newCommissionDetails = new  currentCommissionDetails({
    PayCheckId: req.body.PayCheckId,
    ActiveSalesRepId: req.body.ActiveSalesRepId,
    ActiveSalesRepName: req.body.ActiveSalesRepName,
    PayPeriod: req.body.PayPeriod,
    PaymentTotals: {
      First: req.body.PaymentTotals.First,
      Adj: req.body.PaymentTotals.Adj,
      Final: req.body.PaymentTotals.Final,
      GrandTotal: req.body.PaymentTotals.GrandTotal
    },
    PaymentDetails: req.body.PaymentDetails
  });

  newCommissionDetails.save(function (err) {
    if (err) return res.status(500).json(err);
    else return res.status(200).json(newCommissionDetails);
  })
};


exports.getCurrentCommissionDetails = function(req, res) {
  currentCommissionDetails.find({'ActiveSalesRepId': req.params.activeSalesRepId}, function (err, currentCommissionDetails) {
    if(err) { return handleError(res, err); }
    console.log('current: ', currentCommissionDetails);
    if(!currentCommissionDetails) { return res.status(404).send('Not Found'); }
    return res.json(currentCommissionDetails);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
