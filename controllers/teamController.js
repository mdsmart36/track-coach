app.controller('teamController', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
  $scope.welcome = "Welcome to Team page";
  $scope.team = {};

  var ref = new Firebase('https://track-coach.firebaseIO.com/team');
  $scope.team = $firebaseObject(ref);

}]);
