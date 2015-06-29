app.controller('athleteController', [
  '$scope', 'myService', '$firebaseArray', '$location', '$rootScope', 'FIREBASE_APP',
  function($scope, myService, $firebaseArray, $location, $rootScope, FIREBASE_APP) {

  // THIS CONTROLLER IS USED FOR TWO VIEWS: athletes.html and editAthletes.html

  $scope.welcome1 = "Add Athlete to Team";
  $scope.welcome2 = "Edit Athlete Record";
  
  // assign variables when data is passed through the service (in the case of an 'edit')
  $scope.athlete = myService.editTask;
  $scope.editKey = myService.editKey;
  $scope.list = myService.listRef;

  var userPath = FIREBASE_APP + '/users/' + $rootScope.userName;
  // initialize list of athletes (in the case of an 'add')
  if ($scope.list === null) {
    // var ref = new Firebase('https://track-coach.firebaseIO.com/athletes');
    var ref = new Firebase(userPath + '/athletes');
    $scope.list = $firebaseArray(ref);
  }

  $scope.submit = function(athlete, $firebaseArray) {
    var dob = $scope.athlete.athlete.dob.getTime(); // convert DOB to milliseconds
    $scope.athlete.athlete.dob = dob; // assign to athlete object
    $scope.list.$add(athlete); // save object to athlete array
    $scope.athlete = {}; // clear object
  };

  $scope.done = function($firebaseArray) {    
    var dob = $scope.athlete.athlete.dob.getTime(); // convert DOB to milliseconds
    $scope.athlete.athlete.dob = dob; // assign to athlete object
    $scope.list.$save($scope.editKey); // update athlete object in athlete array
    
    // reset the service properties
    myService.editTask = {};
    myService.editKey = -1;
    myService.listRef = null;

    $location.path('/athletes/view'); // go back to View Athletes page
  }

}]);
