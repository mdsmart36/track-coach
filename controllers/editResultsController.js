app.controller('editResultsController', ['$scope', 'myService', '$firebaseArray', '$location', function($scope, myService, $firebaseArray, $location) {
  
  $scope.welcome = "Edit Event Results";
  
  // get information from myService
  $scope.result = myService.editTask;
  $scope.editKey = myService.editKey;
  $scope.resultList = myService.listRef;
  $scope.names = []; // array of names for an HTML <select>
  $scope.runningEvent = true;

  $scope.events = [ '100m', '100m H', '110m H', '200m', '300m H', '400m', '800m', '1600m', '3200m', 'LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault', '4x100m', '4x200m', '4x400m', '4x800m' ];
  var fieldEvents = ['LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault'];

  // get list of athletes from database
  var refAthletes = new Firebase('https://track-coach.firebaseIO.com/athletes');
  $scope.athleteList = $firebaseArray(refAthletes);
  
  // create an array of names based on the athleteList after the list is loaded from Firebase
  $scope.athleteList.$loaded().then(function(){
    for (var i = 0; i < $scope.athleteList.length; i++) {
      var currentAthlete = $scope.athleteList[i].athlete;
      $scope.names[i] = currentAthlete.firstName + " " + currentAthlete.lastName;
    };
    $scope.names.sort(); // sort the names alphabetically
  });

  $scope.done = function(result) {
    var convertedDate = $scope.result.date.getTime(); // convert DOB to milliseconds
    $scope.result.date = convertedDate;

    var part1 = parseInt($scope.result.part1);
    var part2 = parseInt($scope.result.part2);
    var part3 = parseInt($scope.result.part3);
    var convertedResult = 0;
    var fieldEvents = ['LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault'];

    if (fieldEvents.indexOf($scope.result.event) === -1) {
      // running event, convert result fields to minutes & seconds
      convertedResult = (part1 * 60) + part2 + (part3 / 100);
    } 
      else {  
      // jumping event, convert result fields to feet & inches
      convertedResult = (part1 * 12) + part2 + (part3 / 100);
    }

    // save the updated result and return to results view
    $scope.result.convertedResult = convertedResult;
    $scope.resultList.$save($scope.editKey);
    $location.path('/results/view');
  };

  $scope.showUnits = function() {
    if (fieldEvents.indexOf($scope.result.event) === -1) {
      $scope.runningEvent = true;
    } else  {
      $scope.runningEvent = false;
    }
  };

}]);