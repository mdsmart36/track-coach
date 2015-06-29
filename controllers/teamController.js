app.controller('teamController', [
  '$scope', '$firebaseObject', '$rootScope', 'FIREBASE_APP', 
  function($scope, $firebaseObject, $rootScope, FIREBASE_APP) {
    
  $scope.welcome = "Welcome to Team page";
  $scope.team = {};

  var userPath = FIREBASE_APP + '/users/' + $rootScope.userName;
  var ref = new Firebase(userPath + '/team');
  $scope.team = $firebaseObject(ref);

}]);
