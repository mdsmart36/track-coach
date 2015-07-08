var app = angular.module('TrackCoach', ['ngRoute', 'firebase', 'ui.bootstrap', 'chart.js']);

app.constant('FIREBASE_APP', 'https://track-coach.firebaseio.com');

app.controller('navController', function($scope, $log, $firebaseAuth, $rootScope, $location, FIREBASE_APP) {

  // var ref = new Firebase("https://track-coach.firebaseio.com");
  var ref = new Firebase(FIREBASE_APP);
  $scope.authObj = $firebaseAuth(ref);
  $rootScope.loggedIn = false;

  // when logged in, change navbar to reflect
  $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
      $rootScope.loggedIn = true;
      $rootScope.userName = authData.password.email.replace(/@.*/, '');
      // $log.log($rootScope.userName);

    } else {
      console.log("Logged out");
      $rootScope.loggedIn = false;
    }
  });

  $scope.logout = function(){
    $scope.authObj.$unauth();
    $location.path('/');
  };

  // three helper functions for Angular UI dropdowns
  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    // $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});

// configure routes with Angular Route
app.config(function ($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/partials/splash.html',
      controller: 'splashController'
    }).
    when('/login', {
      templateUrl: 'views/partials/home.html',
      controller: 'homeController'
    }).
    when('/athletes/add', {
      templateUrl: 'views/partials/athletes.html',
      controller: 'athleteController'
    }).
    when('/athletes/view', {
      templateUrl: 'views/partials/viewAthletes.html',
      controller: 'viewAthletesController'
    }).
    when('/athletes/edit', {
      templateUrl: 'views/partials/editAthletes.html',
      controllers: 'athleteController'
    }).
    when('/athletes/profile', {
      templateUrl: 'views/partials/profileAthletes.html',
      controllers: 'profileController'
    }).
    when('/results/add', {
      templateUrl: 'views/partials/results.html',
      controller: 'resultsController'
    }).
    when('/results/view', {
      templateUrl: 'views/partials/viewResults.html',
      controller: 'viewResultsController'
    }).
    when('/results/edit', {
      templateUrl: 'views/partials/editResults.html',
      controller: 'editResultsController'
    }).
    when('/workouts', {
      templateUrl: 'views/partials/workouts.html',
      controllers: 'workoutController'
    }).
    when('/coaches', {
      templateUrl: 'views/partials/team.html',
      controllers: 'teamController'
    }).
    when('/chart', {
      templateUrl: 'views/partials/chart.html',
      controllers: 'chartController'
    }).
    otherwise({
      redirectTo: '/'
    });

});

app.service('myService', function(){
  this.editTask = {}; // object to share
  this.editKey = -1; // index of the object in the array
  this.listRef = null; // ref to the Firebase array
});

app.service('chartService', function(){
  this.data = [];
  this.labels = [];
  this.series =[];
  this.athlete = "";
  this.event = "";
});

