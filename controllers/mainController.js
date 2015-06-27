var app = angular.module('TrackCoach', ['ngRoute', 'firebase', 'ui.bootstrap']);

app.controller('navController', function($scope, $log, $firebaseAuth, $rootScope, $location) {

  var ref = new Firebase("https://track-coach.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);
  $rootScope.loggedIn = false;

  // when logged in, change navbar to reflect
  $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
      $rootScope.loggedIn = true;

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
    when('/team', {
      templateUrl: 'views/partials/team.html',
      controllers: 'teamController'
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
