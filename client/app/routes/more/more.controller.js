/**
 * Created by Flavor on 1/12/16.
 */
app.controller('MoreCtrl', function($scope) {
  $scope.title = 'More';

  $scope.menu = [
    {
      bodyTitle: 'Report Problem',
      labelIcon: 'fa fa-exclamation-circle',
      color: '#FF7857',
      route: 'reportProblem'
    },
    {
      bodyTitle: 'Switch User',
      labelIcon: 'fa fa-exchange',
      color: '#7ACBEE',
      route: 'switchUser'
    },
    {
      bodyTitle: 'Logout',
      labelIcon: 'fa fa-sign-out',
      color: '#927DC0',
      route: 'logout'
    },
    {
      labelIcon: 'fa fa-graduation-cap',
      bodyTitle: 'University',
      id: 'university',
      route: 'university',
      color: '#A3C86D'
    }
  ];


});
