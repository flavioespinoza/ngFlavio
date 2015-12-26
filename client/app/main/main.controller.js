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

  $scope.currentCommisionDetails = [];

  $scope.pastPaymentsList = [];


  pastPayChecks.getCurrentCommissionDetails(activeSalesRepId)
    .then(function (res) {
      $scope.currentCommissionDetails = res.data;
      console.log('$scope.currentCommissionDetails: ', $scope.currentCommissionDetails);

    }).catch(function (err) {
      console.log('getCurrentCommissionDetails err:', err);
    });


  var startDate = new Date(2015, 1, 1).toJSON();
  var endDate = new Date().toJSON();

  pastPayChecks.findPayCheckByPayPeriod(startDate, endDate, activeSalesRepId).then(function (res) {

    $scope.pastPaymentsList = res.data;

    console.log('$scope.pastPaymentsList: ', $scope.pastPaymentsList);

  }).catch(function (err) {
    console.log('findPayCheckByPayPeriod err:', err);
  });

  $scope.getPayCheckById = function (payCheckId) {
    return pastPayChecks.getPayCheckById(payCheckId)
      .then(function (res) {
        console.log('getPayCheckById: ', res);

      }).catch(function (err) {
        console.log('getPayCheckById err:', err);

      });
  };

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
      .then(function(answer) {


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
      "PayCheckId": 123451,
      "ActiveSalesRepId": 105386,
      "ActiveSalesRepName": "Remo Williams",
      "PayPeriod": "1/1/2016",
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

app.directive("scroll", function ($window) {

  return function(scope, element, attrs) {

    /* header DOM element with md-page-header attribute */
    var header = document.querySelector('[md-page-header]');
    /* Store header dimensions to initialize header styling */
    var baseDimensions = header.getBoundingClientRect();
    /* DOM element with md-header-title attribute (title in toolbar) */
    var title = angular.element(document.querySelector('[md-header-title]'));
    /* DOM element with md-header-picture attribute (picture in header) */
    var picture = angular.element(document.querySelector('[md-header-picture]'));

    var imgUrl = 'http://extras.mnginteractive.com/live/media/site568/2014/0312/20140312_050154_0313solarcity.jpg';


    /* DOM element with main-fab class (a DOM element which contains the main float action button element) */
    var fab = angular.element(document.querySelector('.main-fab'));
    /* The height of a toolbar by default in Angular Material */
    var legacyToolbarH = 64;
    /* The mid-height of a float action button by default in Angular Material */
    var legacyFabMid = 56/2;
    /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
    var titleZoom = 1.5;
    /* The primary color palette used by Angular Material */
    var primaryColor = [63,81,181];

    function styleInit () {
      title.css('padding-left','14px');

      title.css('font-size','14px');
      title.css('position','relative');
      title.css('transform-origin', '30px 150px 0px');
    }

    function handleStyle(dim) {
      fab.css('top',(dim.height-legacyFabMid)+'px');
      if ((dim.bottom-baseDimensions.top) > legacyToolbarH) {
        title.css('top', ((dim.bottom-baseDimensions.top)-legacyToolbarH)+'px');
        element.css('height', (dim.bottom-baseDimensions.top)+'px');
        title.css('transform','scale('+((titleZoom-1)*ratio(dim)+1)+','+((titleZoom-1)*ratio(dim)+1)+')');

      } else {
        title.css('top', '0px');
        element.css('height', legacyToolbarH+'px');
        title.css('transform','scale(1,1)');
      }
      if ((dim.bottom-baseDimensions.top) < legacyToolbarH*2 && !fab.hasClass('hide')) {
        fab.addClass('hide');
      }
      if((dim.bottom-baseDimensions.top)>legacyToolbarH*2 && fab.hasClass('hide')) {
        fab.removeClass('hide');
      }
      element.css('background-color','rgba('+primaryColor[0]+','+primaryColor[1]+','+primaryColor[2]+','+(1-ratio(dim))+')');
      picture.css('background-image','url(' + imgUrl + ')');
      //picture.css('-webkit-filter','blur(5px)');
      picture.css('background-position','50% '+(ratio(dim)*50)+'%');
      /* Uncomment the line below if you want shadow inside picture (low performance) */
      //element.css('box-shadow', '0 -'+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)+') inset');
    }

    function ratio(dim) {
      var r = (dim.bottom-baseDimensions.top)/dim.height;
      if(r<0) return 0;
      if(r>1) return 1;
      return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
    }

    styleInit();
    handleStyle(baseDimensions);

    /* Scroll event listener */
    angular.element($window).bind("scroll", function() {
      var dimensions = header.getBoundingClientRect();
      handleStyle(dimensions);
      scope.$apply();
    });

    /* Resize event listener */
    angular.element($window).bind('resize',function () {
      baseDimensions = header.getBoundingClientRect();
      var dimensions = header.getBoundingClientRect();
      handleStyle(dimensions);
      scope.$apply();
    });

  };

});
