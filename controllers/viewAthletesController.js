app.controller('viewAthletesController', [
  '$scope', 
  '$firebaseArray', 
  'myService',
  '$location', function($scope, $firebaseArray, myService, $location) {
  
  $scope.welcome = "Welcome to Athlete View / Edit page";
  $scope.editOn = -1;

  // initialize sorting functions
  $scope.predicate = 'athlete.lastName';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  // Get a database reference to our posts
  var ref = new Firebase('https://track-coach.firebaseIO.com/athletes');
  $scope.list = $firebaseArray(ref);

  $scope.edit = function(key) {
    // pass data to another controller through an Angular service

    // get index for edit item
    var index = -1;
    do {
      index++;
    } while ($scope.list[index].$id !== key)

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
    $scope.list.$remove(key);
  }
    
}]);