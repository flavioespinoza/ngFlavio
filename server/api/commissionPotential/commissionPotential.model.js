/**
 * Created by Flavor on 12/27/15.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var commissionPotentialSchema = new Schema({
  CommissionPotentialId: Number,
  ActiveSalesRepId: Number,
  ActiveSalesRepName: String,
  CommissionPotentialTotals: {
    GrandTotal: Number
  },
  CurrentQuarterlyBonus: {
    GrandTotal: Number,
    QuarterlyBonusDetails: Array
  },
  SoldButNotInstalledDetails: Array
});

module.exports = mongoose.model('commissionPotential', commissionPotentialSchema);
