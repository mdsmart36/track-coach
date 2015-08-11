app.controller('resultsController', [
  '$scope', '$firebaseArray', '$rootScope', 'FIREBASE_APP', '$location', 'chartService',
  function($scope, $firebaseArray, $rootScope, FIREBASE_APP, $location, chartService) {

  // initialize variables for the results form
  $scope.welcome = "Add Results";
  $scope.result = {};
  $scope.names = [];
  $scope.result.part1 = "00";
  $scope.result.part2 = "00";
  $scope.result.part3 = "00";
  $scope.runningEvent = true;

//- data for charts
//------------------------------------
$scope.labels = [];
$scope.series = [];
$scope.data = [];
//-----------------------------

  var today = new Date();
  $scope.result.date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  $scope.events = [ 'Cross Country', '100m', '100m H', '110m H', '200m', '300m H', '400m', '800m', '1600m', '3200m', 'LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault', '4x100m', '4x200m', '4x400m', '4x800m' ];
  var fieldEvents = ['LJ', 'HJ', 'TJ', 'Shot Put', 'Discus', 'Pole Vault'];
  $scope.result.event = $scope.events[0];

  // get list of athletes from database
  var userPath = FIREBASE_APP + '/users/' + $rootScope.userName;
  var refAthletes = new Firebase(userPath + '/athletes');
  var refResults = new Firebase(userPath + '/results');
  $scope.athleteList = $firebaseArray(refAthletes);
  $scope.resultList = $firebaseArray(refResults);
  
  // create an array of names based on the athleteList
  $scope.athleteList.$loaded().then(function(){
    for (var i = 0; i < $scope.athleteList.length; i++) {
      $scope.names[i] = $scope.athleteList[i].athlete.firstName + " " + $scope.athleteList[i].athlete.lastName;
    };
    $scope.names.sort();

    $scope.result.fullName = $scope.names[0]; // set initial value for select input field
  });


  $scope.submit = function(result, $firebaseArray) {
    /*
     * result object:
     *  result.fullName
     *  result.date
     *  result.meet
     *  result.event
     *  result.part1 -- representing minutes or feet
     *  result.part2 -- representing seconds or inches
     *  result.part3 -- representing part of a second or inch
     *    example:  2 43 29 (two minutes, 43 seconds, 29 hundredth of a second)
     *              18 6 25 (18 feet, 6 inches, 1/4 inch)
     */

    var convertedDate = $scope.result.date.getTime();//.toString(); // convert DOB to milliseconds
    $scope.result.date = convertedDate; // assign to result object

    var part1 = parseInt($scope.result.part1);
    var part2 = parseInt($scope.result.part2);
    var part3 = parseInt($scope.result.part3);
    var convertedResult = 0;

    if (fieldEvents.indexOf($scope.result.event) === -1) {
    // running event, convert result fields to seconds
      convertedResult = (part1 * 60) + part2 + (part3 / 100);
    } else {
    // jumping event, convert result fields to inches
      convertedResult = (part1 * 12) + part2 + (part3 / 100);
    }

    $scope.result.convertedResult = convertedResult;

    $scope.resultList.$add(result); // save object to results array
    $scope.result = {}; // clear form data
    // initialize form data
    $scope.result.part1 = "00";
    $scope.result.part2 = "00";
    $scope.result.part3 = "00";
    var today = new Date();
    $scope.result.date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    $scope.result.fullName = $scope.names[0]; // set initial value for select input field
    $scope.result.event = $scope.events[0];

  };

  $scope.showUnits = function() {
    if (fieldEvents.indexOf($scope.result.event) === -1) {
      $scope.runningEvent = true;
    } else  {
      $scope.runningEvent = false;
    }
  };

  $scope.chart = function(result) {
    // search on result.fullName && result.event
    
    $scope.resultList.$loaded().then(function(){
      // when entire array of result has been loaded from Firebase, create chart data
      var tempData = [];
      var tempLabels = [];
      var counter = 1;

      for (var i = 0; i < $scope.resultList.length; i++) {
        if (($scope.resultList[i].fullName === result.fullName) && 
          ($scope.resultList[i].event === result.event)) {
            tempData.push($scope.resultList[i].convertedResult);
            tempLabels.push(counter.toString());
          counter++;
        }
      };

      tempData.sort().reverse();

      // save the data to a shared service, go to chart page and chart controller
      chartService.data = tempData;
      chartService.labels = tempLabels;
      chartService.series = $scope.series;
      chartService.athlete = result.fullName;
      chartService.event = result.event;
      $location.path('/chart');
      
    });

  };

}]);
