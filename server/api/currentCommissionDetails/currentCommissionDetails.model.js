/**
 * Created by Flavor on 12/18/15.
 */
var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var currentCommissionSchema = new Schema({
  PayCheckId: Number,
  ActiveSalesRepId: Number,
  ActiveSalesRepName: String,
  PayPeriod: Date,
  PaymentTotals: {
    First: Number,
    Adj: Number,
    Final: Number,
    GrandTotal: Number
  },
  PaymentDetails: Array
});

module.exports = mongoose.model('currentCommissionDetails', currentCommissionSchema);
