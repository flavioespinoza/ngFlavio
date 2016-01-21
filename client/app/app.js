'use strict';

var app = angular.module('ngFlavApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'wt.responsive',
  'ng-mfb',
  'ngRoute',
  'accordionSideNav'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdGestureProvider) {

  $mdGestureProvider.skipClickHijack();
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('launchpad', {
      url: '/',
      templateUrl: 'app/routes/launchpad/launchpad.html',
      controller: 'LaunchpadCtrl'
    })


    //begin launchpad tab states
    .state('tab', {
      url: '/lp',
      //abstract: true,
      templateUrl: 'app/tabs/tabs.html',
      controller: 'TabsCtrl'
    })

    .state('tab.notifications', {
      url: '/notifications',
      templateUrl: 'app/routes/notifications/notifications.html',
      controller: 'NotificationsCtrl'
    })

    .state('tab.timeSheet', {
      url: '/time-sheet',
      templateUrl: 'app/routes/time-sheet/time-sheet.html',
      controller: 'TimeSheetCtrl'
    })

    .state('tab.pay', {
      url: '/pay',
      templateUrl: 'app/routes/pay/pay.html',
      controller: 'PayCtrl'
    })


    .state('tab.customers', {
      url: '/customers',
      templateUrl: 'app/routes/customers/customers.html',
      controller: 'CustomersCtrl'
    })

    .state('tab.teammates', {
      url: '/teammates',
      templateUrl: 'app/routes/teammates/teammates.html',
      controller: 'TeammatesCtrl'
    })

    .state('tab.more', {
      url: '/more',
      templateUrl: 'app/routes/more/more.html',
      controller: 'MoreCtrl'
    })
    //end launchpad tab states



    //solar works state
    //.state('solarWorks', {
    //  url: 'https://soleo.solarcity.com/',
    //  external: true
    //})




    // More states
    .state('university', {
      url: '/university',
      templateUrl: 'app/routes/university/university.html',
      controller: 'UniversityCtrl'
    })

    //solar works state
    .state('solarWorks', {
      url: 'https://soleo.solarcity.com/',
      external: true
    })

    .state('workday', {
      url: 'https://www.myworkday.com/solarcity/d/home.htmld',
      external: true
    })

    .state('zoom', {
      url: 'https://solarcity.zoom.us/meeting',
      external: true
    })

    .state('zipline', {
      url: 'https://zipline.solarcity.com/login/?next=/',
      external: true
    })

    .state('jira', {
      url: 'https://support.solarcity.com/secure/Dashboard.jspa',
      external: true
    })

    .state('featureOne', {
      url: 'http://ecowatch.com/2015/10/21/celebrities-go-solar/#slide13',
      external: true
    });


});


app.run(function($rootScope, $window) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.external) {
        event.preventDefault();
        $window.open(toState.url, '_blank');
      }
    });
});




app.controller('MainCtrl', function ($scope, $state, $log) {

  $scope.onTabSelected = function(tab){
    $state.go(tab.route);
    console.log('Tab Route', tab.route);
  };

  _.each($scope.menu, function (obj) {
    obj.active = false;
  });

  var activeUrl = _.findWhere($scope.menu, {url: $state.current.name});
  activeUrl.active = true;

  $scope.goToState = function(state){
    $state.go(state);
  };

});






app.controller('NavCtrl', function ($scope, $state, $timeout, $mdSidenav, $log) {

  $scope.goToState = function(state){
    $state.go(state);
  };

  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };
  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }

});

app.controller('LeftNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
});

app.controller('RightNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
});




