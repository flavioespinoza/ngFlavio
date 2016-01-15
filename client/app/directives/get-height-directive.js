/**
 * Created by Flavor on 1/12/16.
 */
app.directive('getHeight', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var circleMenu = angular.element(document.querySelector('.circular-menu'));
      console.log(element[0].clientHeight);
      var marginTop = (element[0].clientHeight - 384) / 2;
      function styleInit () {
        circleMenu.css('margin-top', marginTop + 'px');

      }
      styleInit();

    }
  };
});
