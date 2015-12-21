/***
 * Created by Flavor on 12/18/15.
 **/

var pastPayCheck =  require('./currentCommissionDetails.model.js');
var moment = require('moment');


exports.getCurrentCommissionDetails222 = function(req, res) {

  var activeSalesRepId = req.body.activeSalesRepId;


  console.log('activeSalesRepId', activeSalesRepId);

  pastPayCheck.findOne({'ActiveSalesRepId': activeSalesRepId}, function (err, payCheck) {
    if(err) { return handleError(res, err); }
    if(!payCheck) { return res.status(404).send('Not Found'); }
    return res.json(payCheck);
  });

};

exports.getCurrentCommissionDetails = function(req, res) {
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

function handleError(res, err) {
  return res.status(500).send(err);
}
