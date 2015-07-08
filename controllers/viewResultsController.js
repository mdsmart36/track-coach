app.controller('viewResultsController', [
  '$scope', '$firebaseArray', 'myService', '$location', '$rootScope', 'FIREBASE_APP', 
  function($scope, $firebaseArray, myService, $location, $rootScope, FIREBASE_APP) {

  $scope.welcome = "View Results";
  
  // initialize sorting functions
  $scope.predicate = 'fullName';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  // Get a database reference to our posts
  var userPath = FIREBASE_APP + '/users/' + $rootScope.userName;
  var ref = new Firebase(userPath + '/results');
  $scope.list = $firebaseArray(ref);

  var fieldEvents = ['LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault'];
  $scope.resultsArray = [];

  // when results list is loaded, populate a new resultsArray with string values
  $scope.list.$loaded().then(function(){
    for (var i = 0; i < $scope.list.length; i++) {
      var result = $scope.list[i];
      var part1 = result.part1;
      var part2 = result.part2;
      var part3 = result.part3;

      if (fieldEvents.indexOf(result.event) === -1) {
      // running event, convert result to time string
        $scope.list[i].resultString = part1 + ":" + part2 + "." + part3;
      } else {
      // jumping event, convert result to distance string
        $scope.list[i].resultString = part1 + "\' " + part2 + "." + part3 + "\""
      }
    }
  });

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
    convertedDate.setTime($scope.list[index].date);
    
    myService.editTask.date = convertedDate;
    myService.editKey = index;
    myService.listRef = $scope.list;
    $location.path('/results/edit');
  }

  $scope.remove = function(key) {
    // WARN USER: This cannot be undone
    // OR give user the option to restore

    // get index for remove item
    var index = getIndex(key);
    $scope.list.$remove(index);
  }

  $scope.print = function(){
    window.print();
  }

}]);
