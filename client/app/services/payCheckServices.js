/**
 * Created by Flavor on 12/18/15.
 */
var app = angular.module('ngFlavApp');

app.factory('pastPayChecks', function ($http) {

  var currentCommissionUrl = 'http://localhost:9000/api/currentCommissionDetails';
  var pastCommissionUrl = 'http://localhost:9000/api/pastPayChecks';

  var getCurrentCommissionDetails = function(startDate, endDate, activeSalesRepId) {
    var data = {
      startDate : startDate,
      endDate : endDate,
      activeSalesRepId : activeSalesRepId
    };

    return $http({
      method: 'POST',
      url: currentCommissionUrl + '/' + activeSalesRepId,
      data: data
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
      url: pastCommissionUrl + '/newPayCheck',
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
    getPayCheckById: getPayCheckById
  }

});
