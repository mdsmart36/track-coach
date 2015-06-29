app.controller('teamController', ['$scope', '$firebaseObject', 'FIREBASE_APP', function($scope, $firebaseObject, FIREBASE_APP) {
  $scope.welcome = "Welcome to Team page";
  $scope.team = {};

  var ref = new Firebase(FIREBASE_APP + '/team');
  $scope.team = $firebaseObject(ref);

}]);
