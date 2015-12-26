/***
 * Created by Flavor on 12/18/15.
 **/

var pastPayCheck =  require('./pastPayChecks.model');
var moment = require('moment');

exports.newPayCheck = function (req, res) {

  var newPayCheck = new  pastPayCheck({
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

  newPayCheck.save(function (err) {
    if (err) return res.status(500).json(err);
    else return res.status(200).json(newPayCheck);
  })

};

exports.getPayCheckById = function(req, res) {
  console.log('checkid: ', typeof req.params.payCheckId);
  pastPayCheck.find({'PayCheckId': req.params.payCheckId}, function (err, payCheck) {
    if(err) { return handleError(res, err); }
    if(!payCheck) { return res.status(404).send('Not Found'); }
    return res.json(payCheck);
  });
};

exports.findPayCheckByPayPeriod = function(req, res) {
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  console.log('endDate: ', endDate);
  var activeSalesRepId = req.body.activeSalesRepId;

  pastPayCheck.find({
    'ActiveSalesRepId' : activeSalesRepId,
    'PayPeriod' :  {"$gte": startDate, "$lt": endDate}},
    function(err, payChecks) {
      if(err) return res.status(500).json(err);
      else return res.status(200).json(payChecks);
  })

};

exports.getPayCheck = function(req, res) {
  pastPayCheck.find(function (err, list) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(list);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
