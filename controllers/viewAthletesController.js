app.controller('viewAthletesController', [
  '$scope', 
  '$firebaseArray', 
  'myService',
  '$location', function($scope, $firebaseArray, myService, $location) {
  
  $scope.welcome = "Welcome to Athlete View / Edit page";
  $scope.editOn = -1;

  // Get a database reference to our posts
  var ref = new Firebase('https://track-coach.firebaseIO.com/athletes');
  $scope.list = $firebaseArray(ref);

  $scope.edit = function(key) {
    // pass data to another controller through an Angular service
    myService.editTask = $scope.list[key];

    // change DOB from milliseconds to Date object
    var convertedDate = new Date();
    convertedDate.setTime($scope.list[key].athlete.dob);
    // var convertedDate = new Date().setTime($scope.list[key].athlete.dob);
    
    myService.editTask.athlete.dob = convertedDate;
    // myService.dateObject = convertedDate;
    myService.editKey = key;
    myService.listRef = $scope.list;
    $location.path('/athletes/edit');
  }

  $scope.remove = function(key) {
    // WARN USER: This cannot be undone
    // OR give user the option to restore
    $scope.list.$remove(key);
  }
    
}]);