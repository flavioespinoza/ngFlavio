/**
 * Created by Flavor on 12/18/15.
 */
var app = angular.module('ngFlavApp');

app.factory('pastPayChecks', function ($http) {

  var currentCommissionUrl = 'http://localhost:9000/api/currentCommissionDetails';
  var pastCommissionUrl = 'http://localhost:9000/api/pastPayChecks';
  var commissionPotentialUrl = 'http://localhost:9000/api/commissionPotential';

  var getCurrentCommissionDetails = function(activeSalesRepId) {
    return $http({
      method: 'GET',
      url: currentCommissionUrl + '/' + activeSalesRepId
    })
  };

  var getCommissionPotential = function(activeSalesRepId) {
    return $http({
      method: 'GET',
      url: commissionPotentialUrl + '/' + activeSalesRepId
    })
  };

  var createNew = function (payCheckDetails) {
    var data = {
      PayCheckId: payCheckDetails.PayCheckId,
      ActiveSalesRepId: payCheckDetails.ActiveSalesRepId,
      ActiveSalesRepName: payCheckDetails.ActiveSalesRepName,
      PayPeriod: payCheckDetails.PayPeriod,
      PaymentTotals: {
        First: payCheckDetails.PaymentTotals.First,
        Adj: payCheckDetails.PaymentTotals.Adj,
        Final: payCheckDetails.PaymentTotals.Final,
        GrandTotal: payCheckDetails.PaymentTotals.GrandTotal
      },
      PaymentDetails: payCheckDetails.PaymentDetails
    };

    return $http({
      method: 'POST',
      url: commissionPotentialUrl,
      //url: pastCommissionUrl + '/newPayCheck',
      //url: currentCommissionUrl,
      data: data
    });

  };


  var createNewCommissionPotential = function (commissionPotential) {
    var data = {
      CommissionPotentialId: commissionPotential.PayCheckId,
      ActiveSalesRepId: commissionPotential.ActiveSalesRepId,
      ActiveSalesRepName: commissionPotential.ActiveSalesRepName,
      CommissionPotentialTotals: {
        GrandTotal: commissionPotential.CommissionPotentialTotals.GrandTotal
      },
      CurrentQuarterlyBonus: {
        GrandTotal: commissionPotential.CurrentQuarterlyBonus.GrandTotal,
        QuarterlyBonusDetails: commissionPotential.CurrentQuarterlyBonus.QuarterlyBonusDetails
      },
      SoldButNotInstalledDetails: commissionPotential.SoldButNotInstalledDetails
    };

    return $http({
      method: 'POST',
      url: commissionPotentialUrl,
      data: data
    });

  };

  var getPayCheckById = function (payCheckId) {
    return $http({
      method: 'GET',
      url: pastCommissionUrl + '/' + payCheckId
    })
  };

  var findPayCheckByPayPeriod = function(startDate, endDate, activeSalesRepId) {

    var data = {
      startDate : startDate,
      endDate : endDate,
      activeSalesRepId : activeSalesRepId
    };

    return $http({
      method: 'POST',
      url: pastCommissionUrl + '/findPayCheckByPayPeriod',
      data: data
    })

  };

  return {
    getCurrentCommissionDetails: getCurrentCommissionDetails,
    createNew: createNew,
    findPayCheckByPayPeriod : findPayCheckByPayPeriod,
    getPayCheckById: getPayCheckById,
    getCommissionPotential: getCommissionPotential,
    createNewCommissionPotential: createNewCommissionPotential
  }

});
