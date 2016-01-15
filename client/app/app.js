'use strict';

var app = angular.module('ngFlavApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'wt.responsive',
  'ng-mfb'
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


    //launchpad states
    // setup an abstract state for the tabs directive
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
    })



    //.state('', {
    //  url: '',
    //  external: true
    //})
    //
    //.state('', {
    //  url: '',
    //  external: true
    //})
    //
    //.state('', {
    //  url: '',
    //  external: true
    //})
    //
    //.state('', {
    //  url: '',
    //  external: true
    //})
    //
    //.state('', {
    //  url: '',
    //  external: true
    //})


});


app.run(function($rootScope, $window) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.external) {
        event.preventDefault();
        $window.open(toState.url, '_blank');
      }
    });
})


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






app.controller('AppCtrl', function($scope, $state, $log) {

  $scope.onTabSelected = function(tab){
    $state.go(tab.route);
    console.log('Tab Route', tab.route);
  };

  var tabs = [
      { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
      { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
      { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
      { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
      { title: 'Five', content: "If you remove a tab, it will try to select a new one."},
      { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
      { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
      { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
      { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"}
    ],
    selected = null,
    previous = null;

  $scope.tabs = tabs;
  $scope.selectedIndex = 2;

  $scope.$watch('selectedIndex', function(current, old){
    previous = selected;
    selected = tabs[current];
    if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
    if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
  });



});

app.directive('tabClicked', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {


      element.bind('click', function(event) {



        console.log(attrs.label + 'clicked');
      });
    }
  };
});




