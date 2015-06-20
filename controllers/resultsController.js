app.controller('resultsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  $scope.welcome = "Welcome to Add Results page";
  $scope.result = {};

  // get list of athletes from database
  var ref = new Firebase('https://track-coach.firebaseIO.com/athletes');
  $scope.list = $firebaseArray(ref);
  $scope.names = [];
  
  // create an array of names based on the list
  $scope.list.$loaded().then(function(){
    for (var i = 0; i < $scope.list.length; i++) {
      console.log($scope.list[i].athlete.firstName);
      $scope.names[i] = $scope.list[i].athlete.firstName + " " + $scope.list[i].athlete.lastName;
    };
  });

}]);
