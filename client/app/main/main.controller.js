/**
 * Created by Flavor on 12/18/15.
 */
var app = angular.module('ngFlavApp');
app.controller('MainCtrl', function($scope, $http, pastPayChecks) {

  //TODO: Make this a directive which can read the div width dynamically for responsiveness
  /**
   * Get active accounts sold but not installed for Commission Potential and render
   * in D3 graph
   */

  //TODO: Set up separate API for Sold Not Installed data with potential commission calculated
  var data = [
    {
      "GrandTotal": 200,
      "Final": 200,
      "Adj": null,
      "Notes": "",
      "Panels": 10,
      "SystemSize": 2.6,
      "ProductType": "PV System",
      "MarketType": null,
      "Referral": "",
      "CustomerName": "Yang, Xiao Long",
      "JobID": "JB-9405432-00",
      "CreatedDate": "6/23/2015"
    },
    {
      "GrandTotal": 765,
      "Final": 765,
      "Adj": null,
      "Notes": "",
      "Panels": 17,
      "SystemSize": 4.42,
      "ProductType": "PV System",
      "MarketType": null,
      "Referral": "Referral",
      "CustomerName": "Galicia, Francisco",
      "JobID": "JB-9412659-00",
      "CreatedDate": "6/25/2015"
    },
    {
      "GrandTotal": 1125,
      "Final": 1125,
      "Adj": null,
      "Notes": "",
      "Panels": 25,
      "SystemSize": 6.5,
      "ProductType": "PV System",
      "MarketType": null,
      "Referral": "Referral",
      "CustomerName": "Medeiros, Dennis",
      "JobID": "JB-94516446-00",
      "CreatedDate": "6/26/2015"
    },
    {
      "GrandTotal": 990,
      "Final": 990,
      "Adj": null,
      "Notes": "",
      "Panels": 22,
      "SystemSize": 5.72,
      "ProductType": "PV System",
      "MarketType": null,
      "Referral": "Referral",
      "CustomerName": "Ponce, Felipe",
      "JobID": "JB-9405533-00",
      "CreatedDate": "7/13/2015"
    },
    {
      "GrandTotal": 990,
      "Final": 990,
      "Adj": null,
      "Notes": "",
      "Panels": 22,
      "SystemSize": 5.72,
      "ProductType": "PV System",
      "MarketType": null,
      "Referral": "Referral",
      "CustomerName": "Varghese, Santosh",
      "JobID": "JB-9405555-00",
      "CreatedDate": "7/16/2015"
    }
  ];

  var percentage = function (width, percentage) {
    return width / 100 * percentage;
  };

  var createGraph = function (data, width, duration) {
    var bar, barHeight, chart, lineHeight, max, minus, number, numerMinus, row, scale;
    lineHeight = 48;
    barHeight = 20;
    max = d3.max(data, function (d) {
      return d.Final;
    });
    minus = percentage(width, 24);
    scale = d3.scale.linear().domain([
      0,
      max
    ]).range([
      0,
      width - minus
    ]);
    chart = d3.select('.graph').attr('width', width).attr('height', lineHeight * data.length);
    row = chart.selectAll('g').data(data).enter().append('g').attr('transform', function (d, i) {
      return 'translate(0,' + i * lineHeight + ')';
    });
    bar = row.append('g');
    bar.attr('style', 'fill: #3F51B5; opacity: .75;');
    bar.append('text').attr('x', 0).attr('y', 10).attr('width', 120).attr('height', 10).attr('style', 'fill: #3F51B5; font-size: 0.9rem').text(function (d) {
      return d.CustomerName;
    });
    bar.append('rect').attr('x', 0).attr('y', 12).attr('width', 0).attr('height', barHeight).transition().duration(duration).attr('width', function (d) {
      return scale(d.Final);
    });
    number = row.append('g');
    numerMinus = percentage(width, 4);
    number.append('text').data(data).attr('x', width - numerMinus).attr('y', barHeight).attr('dy', '.35em').text(0).attr('style', 'fill: #3F51B5').attr('text-anchor', 'end').transition().duration(duration).tween('text', function (d) {
      var i, prec, round;

      i = d3.interpolate(this.textContent, d.Final);
      prec = d.CustomerName.toString().split('.');
      round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
      return function (t) {
        return this.textContent = Math.round(i(t) * round) / round;
      };
    });
  };

  createGraph(data, 320, 1000);


  /**
   * Get past paychecks for current user
   */
  var activeSalesRepId = 105386;
  //var activeSalesRepId = 111111;

  $scope.currentCommisionDetails = [];

  $scope.pastPaymentsList = [];

  pastPayChecks.getPayCheckById(333333).then(function(res){
    console.log('getPayCheckById: ', res);

  }).catch(function(err) {
    console.log('getPayCheckById err:', err);
  });

  pastPayChecks.getCurrentCommissionDetails(activeSalesRepId)
    .then(function(res){
      $scope.currentCommissionDetails = res.data;
      console.log('$scope.currentCommissionDetails: ', $scope.currentCommissionDetails);

    }).catch(function(err) {
      console.log('getCurrentCommissionDetails err:', err);
    });


  var startDate = new Date(2015, 1, 1).toJSON();
  var endDate = new Date().toJSON();

  pastPayChecks.findPayCheckByPayPeriod(startDate, endDate, activeSalesRepId).then(function(res) {

    $scope.pastPaymentsList = res.data;

    console.log('$scope.pastPaymentsList: ', $scope.pastPaymentsList);

  }).catch(function(err) {
    console.log('findPayCheckByPayPeriod err:', err);
  });


});
