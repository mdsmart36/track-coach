app.controller('editResultsController', ['$scope', 'myService', '$firebaseArray', '$location', function($scope, myService, $firebaseArray, $location) {
  
  $scope.welcome = "Edit Event Results";
  
  // get information from myService
  $scope.result = myService.editTask;
  $scope.editKey = myService.editKey;
  $scope.resultList = myService.listRef;
  $scope.names = [];

  $scope.events = [ '100m', '100m H', '110m H', '200m', '300m H', '400m', '800m', '1600m', '3200m', 'LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault', '4x100m', '4x200m', '4x400m', '4x800m' ];
  var fieldEvents = ['LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault'];

  // get list of athletes from database
  var refAthletes = new Firebase('https://track-coach.firebaseIO.com/athletes');
  // var refResults = new Firebase('https://track-coach.firebaseIO.com/results');
  $scope.athleteList = $firebaseArray(refAthletes);
  // $scope.resultList = $firebaseArray(refResults);
  
  // create an array of names based on the athleteList
  $scope.athleteList.$loaded().then(function(){
    for (var i = 0; i < $scope.athleteList.length; i++) {
      $scope.names[i] = $scope.athleteList[i].athlete.firstName + " " + $scope.athleteList[i].athlete.lastName;
    };
    $scope.names.sort();
  });

  $scope.done = function(result) {
    var convertedDate = $scope.result.date.getTime();//.toString(); // convert DOB to milliseconds
    $scope.result.date = convertedDate; // assign to result object

    var part1 = parseInt($scope.result.part1);
    var part2 = parseInt($scope.result.part2);
    var part3 = parseInt($scope.result.part3);
    var convertedResult = 0;

    if (fieldEvents.indexOf($scope.result.event) === -1) {
    // running event, convert result fields to seconds
      console.log('running event');
      convertedResult = (part1 * 60) + part2 + (part3 / 100);
    } else {
    // jumping event, convert result fields to inches
      console.log('field event');
      convertedResult = (part1 * 12) + part2 + (part3 / 100);
    }

    $scope.result.convertedResult = convertedResult;
    $scope.resultList.$save($scope.editKey);
    $location.path('/results/view');
  }


}]);