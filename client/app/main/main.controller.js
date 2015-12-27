/**
 * Created by Flavor on 12/18/15.
 */
var app = angular.module('ngFlavApp');

app.controller('MainCtrl', function ($scope, $http, $mdDialog, pastPayChecks) {

  /**
   * Get past paychecks for current user
   */
  var activeSalesRepId = 105386;
  //var activeSalesRepId = 111111;

  $scope.currentCommissionDetails = [];

  $scope.pastPaymentsList = [];



  var foo = 'lll';

  var startDate = new Date(2011, 1, 1).toJSON();
  var endDate = new Date().toJSON();

  pastPayChecks.findPayCheckByPayPeriod(startDate, endDate, activeSalesRepId).then(function (res) {

    $scope.pastPaymentsList = res.data;

    console.log('$scope.pastPaymentsList: ', $scope.pastPaymentsList);

  }).catch(function (err) {
    console.log('findPayCheckByPayPeriod err:', err);
  });

  pastPayChecks.getCurrentCommissionDetails(activeSalesRepId)
    .then(function (res) {
      $scope.currentCommissionDetails = res.data[0];
      console.log('$scope.currentCommissionDetails: ', $scope.currentCommissionDetails);

    }).catch(function (err) {
      console.log('getCurrentCommissionDetails err:', err);
    });

  $scope.showCommissionDetail = function(ev, commissionDetail) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        commissionDetail: commissionDetail
      }
    })
      .then(function() {


      }, function() {

      });



  };

  function DialogController($scope, $mdDialog, commissionDetail) {

    $scope.commissionDetail = commissionDetail;

    $scope.close = function() {
      $mdDialog.hide();
    };

  }

  $scope.pushData = function () {

    var payCheckObj = {
      "PayCheckId": 113452,
      "ActiveSalesRepId": 105386,
      "ActiveSalesRepName": "Remo Williams",
      "PayPeriod": "3/1/2015",
      "PaymentTotals": {
        "First": null,
        "Adj": -185.13,
        "Final": 4370,
        "GrandTotal": 4184.87
      },
      "PaymentDetails": [
        {
          "CreatedDate": "3/27/2014",
          "JobId": "JB-9403552-00",
          "CustomerName": "Wang, Yongqi",
          "Referral": "",
          "MarketType": null,
          "ProductType": "",
          "SystemSize": 4.08,
          "Panels": null,
          "Notes": "Cancelled",
          "Adj": -185.13,
          "Final": null,
          "GrandTotal": -185.13
        },
        {
          "CreatedDate": "5/11/2015",
          "JobId": "JB-9373963-00",
          "CustomerName": "Mixay, William",
          "Referral": "",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 2.6,
          "Panels": 10,
          "Notes": "",
          "Adj": null,
          "Final": 200,
          "GrandTotal": 200
        },
        {
          "CreatedDate": "5/25/2015",
          "JobId": "JB-9405277-00",
          "CustomerName": "Ghazvini, Mariam",
          "Referral": "",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 8.06,
          "Panels": 31,
          "Notes": "Transfer of Rep after 'Final contract and before installation",
          "Adj": null,
          "Final": 100,
          "GrandTotal": 100
        },
        {
          "CreatedDate": "6/23/2015",
          "JobId": "JB-9405432-00",
          "CustomerName": "Yang, Xiao Long",
          "Referral": "",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 2.6,
          "Panels": 10,
          "Notes": "",
          "Adj": null,
          "Final": 200,
          "GrandTotal": 200
        },
        {
          "CreatedDate": "6/25/2015",
          "JobId": "JB-9412659-00",
          "CustomerName": "Galicia, Francisco",
          "Referral": "Referral",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 4.42,
          "Panels": 17,
          "Notes": "",
          "Adj": null,
          "Final": 765,
          "GrandTotal": 765
        },
        {
          "CreatedDate": "6/26/2015",
          "JobId": "JB-94516446-00",
          "CustomerName": "Medeiros, Dennis",
          "Referral": "Referral",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 6.5,
          "Panels": 25,
          "Notes": "",
          "Adj": null,
          "Final": 1125,
          "GrandTotal": 1125
        },
        {
          "CreatedDate": "7/13/2015",
          "JobId": "JB-9405533-00",
          "CustomerName": "Ponce, Felipe",
          "Referral": "Referral",
          "MarketType": null,
          "ProductType": "PV System",
          "SystemSize": 5.72,
          "Panels": 22,
          "Notes": "",
          "Adj": null,
          "Final": 990,
          "GrandTotal": 990
        }
      ]
    };

    pastPayChecks.createNew(payCheckObj)
      .then(function (response) {
        console.log('response: ', response);
      })

  };

});

