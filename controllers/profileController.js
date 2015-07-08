app.controller('profileController', [
  '$scope', '$location', 'myService',
  function($scope, $location, myService) {
  
  $scope.welcome = "Athlete Profile";
  $scope.athlete = myService.editTask;

  $scope.edit = function() {
    $location.path('/athletes/edit');
  }

  $scope.back = function() {
    $location.path('/athletes/view');
  }

}]);
