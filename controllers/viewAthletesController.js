app.controller('viewAthletesController', [
  '$scope', '$firebaseArray', 'myService', '$location', '$rootScope', 'FIREBASE_APP', 
  function($scope, $firebaseArray, myService, $location, $rootScope, FIREBASE_APP) {
  
  $scope.welcome = "Welcome to Athlete View / Edit page";

  // initialize sorting functions
  $scope.predicate = 'athlete.lastName';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  // Get a database reference to our posts
  var userPath = FIREBASE_APP + '/users/' + $rootScope.userName;
  var ref = new Firebase(userPath + '/athletes');
  $scope.list = $firebaseArray(ref);

  function getIndex(key) {
    var index = -1;
    do {
      index++;
    } while ($scope.list[index].$id !== key)
    return index;
  }

  $scope.edit = function(key) {
    // pass data to another controller through an Angular service

    var index = getIndex(key);
    myService.editTask = $scope.list[index];

    // change DOB from milliseconds to Date object
    var convertedDate = new Date();
    convertedDate.setTime($scope.list[index].athlete.dob);
    
    myService.editTask.athlete.dob = convertedDate;
    myService.editKey = index;
    myService.listRef = $scope.list;
    $location.path('/athletes/edit');
  }

  $scope.remove = function(key) {
    // WARN USER: This cannot be undone
    // OR give user the option to restore

    // get index for remove item
    var index = getIndex(key);
    $scope.list.$remove(index);
  }
    
}]);