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

  $scope.commissionPotentialDetails = [];
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

  pastPayChecks.getCommissionPotential(activeSalesRepId)
    .then(function (res) {
      $scope.commissionPotentialDetails = res.data[0];
      console.log('$scope.commissionPotentialDetails: ', $scope.commissionPotentialDetails);

    }).catch(function (err) {
      console.log('getCurrentCommissionDetails err:', err);
    });

  pastPayChecks.getCurrentCommissionDetails(activeSalesRepId)
    .then(function (res) {
      $scope.currentCommissionDetails = res.data[0];
      console.log('$scope.currentCommissionDetails: ', $scope.currentCommissionDetails);

    }).catch(function (err) {
      console.log('getCurrentCommissionDetails err:', err);
    });


  /**
   * Show potential commission details & quarterly bonus details
   */
  $scope.showPotentialCommissionDetail = function(ev, potentialCommissionDetail) {
    $mdDialog.show({
      controller: potentialCommissionDialogController,
      templateUrl: 'dialog2.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        potentialCommissionDetail: potentialCommissionDetail
      }
    })
      .then(function() {


      }, function() {

      });
  };

  function potentialCommissionDialogController($scope, $mdDialog, potentialCommissionDetail) {

    $scope.potentialCommissionDetail = potentialCommissionDetail;

    $scope.close = function() {
      $mdDialog.hide();
    };

  }


  /**
   * Show past and current commission details
   */
  $scope.showCommissionDetail = function(ev, commissionDetail) {
    $mdDialog.show({
      controller: dialogController,
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

  function dialogController($scope, $mdDialog, commissionDetail) {

    $scope.commissionDetail = commissionDetail;

    $scope.close = function() {
      $mdDialog.hide();
    };

  }

  $scope.pushData = function () {

    var payCheckObj = {
      "CommissionPotentialId": 555555,
      "ActiveSalesRepId": 105386,
      "ActiveSalesRepName": "Remo Williams",
      "CommissionPotentialTotals": {
        "GrandTotal": 4370
      },
      "CurrentQuarterlyBonus": {
        "GrandTotal": 1850,
        "QuarterlyBonusDetails": [
          {
            "Reason": "Reason A",
            "Value": 1000
          },
          {
            "Reason": "Reason B",
            "Value": 850
          }
        ]
      },
      "SoldButNotInstalledDetails": [
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
          "GrandTotal": 990
        }
      ]
    };

    pastPayChecks.createNewCommissionPotential(payCheckObj)
      .then(function (response) {
        console.log('response: ', response);
      })

  };

});

