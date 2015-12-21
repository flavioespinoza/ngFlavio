/**
 * Created by Flavor on 12/18/15.
 */
var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

//var pastPayChecksDetails = new Schema({
//  CreatedDate: Date,
//  CustomerName: String,
//  Referral: String,
//  MarketType: String,
//  ProductType: String,
//  SystemSize: Number,
//  Panels: Number,
//  Notes: String,
//  JobID: String,
//  ActiveSalesRep: Number,
//  First: Number,
//  Adj: Number,
//  Final: Number,
//  GrandTotal: Number
//});

var pastPayChecksSchema = new Schema({
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

module.exports = mongoose.model('pastPayCheck', pastPayChecksSchema);
