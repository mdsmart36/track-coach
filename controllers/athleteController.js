app.controller('athleteController', ['$scope', 'myService', '$firebaseArray', '$location',
  function($scope, myService, $firebaseArray, $location) {
  
  $scope.welcome1 = "Add Athlete to Team";
  $scope.welcome2 = "Edit Athlete Record";
  $scope.athlete = myService.editTask;
  $scope.editKey = myService.editKey;
  $scope.list = myService.listRef;
  // $scope.dateObject = myService.dateObject;
  // console.log($scope.athlete.athlete.dob);

  if ($scope.list === null) {
    var ref = new Firebase('https://track-coach.firebaseIO.com/athletes');
    $scope.list = $firebaseArray(ref);
    // $scope.dateObject = new Date();
  }

  $scope.submit = function(athlete, $firebaseArray) {
    var dob = $scope.athlete.athlete.dob.getTime().toString(); // convert DOB to milliseconds

    // console.log($scope.athlete.athlete.dob.toString());
    // console.log(typeof $scope.athlete.athlete.dob.toString());

    // var dob = $scope.dateObject.getTime().toString();
    $scope.athlete.athlete.dob = dob; // assign to athlete object
    $scope.list.$add(athlete); // save object to athlete array
    $scope.athlete = {}; // clear object
  };

  $scope.done = function($firebaseArray) {    
    var dob = $scope.athlete.athlete.dob.getTime().toString(); // convert DOB to milliseconds
    $scope.athlete.athlete.dob = dob; // assign to athlete object
    $scope.list.$save($scope.editKey); // update athlete object in athlete array
    
    // reset the service properties
    myService.editTask = {};
    myService.editKey = -1;
    myService.listRef = null;

    $location.path('/athletes/view');
  }

}]);
