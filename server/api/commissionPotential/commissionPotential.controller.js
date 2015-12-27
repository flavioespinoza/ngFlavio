/**
 * Created by Flavor on 12/27/15.
 */

var commissionPotential =  require('./commissionPotential.model.js');
var moment = require('moment');

exports.newCommissionPotential = function (req, res) {
  var newCommissionPotential = new  commissionPotential({
    CommissionPotentialId: req.body.CommissionPotentialId,
    ActiveSalesRepId: req.body.ActiveSalesRepId,
    ActiveSalesRepName: req.body.ActiveSalesRepName,
    CommissionPotentialTotals: {
      GrandTotal: req.body.CommissionPotentialTotals.GrandTotal
    },
    CurrentQuarterlyBonus: {
      GrantTotal: req.body.CurrentQuarterlyBonus.GrandTotal,
      QuarterlyBonusDetails: req.body.CurrentQuarterlyBonus.QuarterlyBonusDetails
    },
    SoldButNotInstalledDetails: req.body.SoldButNotInstalledDetails
  });

  newCommissionPotential.save(function (err) {
    if (err) return res.status(500).json(err);
    else return res.status(200).json(newCommissionPotential);
  })
};


exports.getCommissionPotential = function(req, res) {
  commissionPotential.find({'ActiveSalesRepId': req.params.activeSalesRepId}, function (err, commissionPotential) {
    if(err) { return handleError(res, err); }
    console.log('current: ', commissionPotential);
    if(!commissionPotential) { return res.status(404).send('Not Found'); }
    return res.json(commissionPotential);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
