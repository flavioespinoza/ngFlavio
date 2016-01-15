/**
 * Created by Flavor on 1/12/16.
 */
app.controller("TabsCtrl", function($rootScope, $scope, $state) {

  $scope.align = {
    bottom: true
  };

  $scope.tabs = [
    {
      labelIcon: 'fa fa-bullhorn',
      bodyTitle: 'Notifications',
      id: 'notifications',
      route: 'tab.notifications',
      active: false,
      color: '#A3C86D'
    },
    {
      labelIcon: 'fa fa-clock-o',
      bodyTitle: 'Time Sheet',
      id: 'timeSheet',
      route: 'tab.timeSheet',
      active: false,
      color: '#FF7857'
    },
    {
      labelIcon: 'fa fa-dollar',
      bodyTitle: 'Pay',
      route: 'tab.pay',
      active: false,
      color: '#7ACBEE'
    },
    {
      labelIcon: 'fa fa-heart',
      bodyTitle: 'Customers',
      id: 'customers',
      route: 'tab.customers',
      active: false,
      color: '#927DC0'
    },
    {
      labelIcon: 'fa fa-users',
      bodyTitle: 'Teammates',
      id: 'teammates',
      route: 'tab.teammates',
      active: false,
      color: '#FDD761'
    },
    {
      labelIcon: 'fa fa-bars',
      bodyTitle: 'More',
      id: 'more',
      route: 'tab.more',
      active: false,
      color: 'pink'
    }
  ];




  $scope.onTabSelected = function(tab){
    $state.go(tab.route);
    console.log('Tab Route', tab.route);
  };

  $scope.active = function(tab){
    return $state.is(tab.route);
  };

  $scope.$on("$stateChangeSuccess", function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab);
    });
  });

});
