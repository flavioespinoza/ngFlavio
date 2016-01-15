/**
 * Created by Flavor on 1/12/16.
 */
app.directive('resize', function ($window) {
  return {
    link: function($scope, element) {
      var w = angular.element($window);
      $scope.getWindowDimensions = function () {
        return { 'h': w[0].innerHeight, 'w': w[0].innerWidth };
      };
      $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
        $scope.windowHeight = newValue.h;
        $scope.windowWidth = newValue.w;

        $scope.style = function (minusWidth, minusHeight) {
          if(!minusWidth) {
            minusWidth = 0;
          }
          if(!minusHeight) {
            minusHeight = 0;
          }
          return {
            'width': (newValue.w - minusWidth) + 'px',
            'height': (newValue.h - minusHeight) + 'px',
            'overflow-y': 'scroll',
            'border': '1px solid lightgray'
            //'border': '1px solid red'
          };
        };
      }, true);

      w.bind('resize', function () {
        $scope.$apply();
      });
    }
  }
});
