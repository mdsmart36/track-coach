var app = angular.module('TrackCoach', ['ngRoute', 'firebase', 'ui.bootstrap']);

app.controller('navController', function($scope, $log, $firebaseAuth, $rootScope, $location) {

  var ref = new Firebase("https://track-coach.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);
  $rootScope.loggedIn = false;

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

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});

app.config(function ($routeProvider) {
  $routeProvider.
    when('/', {
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
      // templateUrl: 'views/partials/athletes.html',
      controllers: 'athleteController'
    }).
    when('/results/add', {
      templateUrl: 'views/partials/addResults.html',
      controller: 'addResultsController'
    }).
    when('/results/view', {
      templateUrl: 'views/partials/viewResults.html',
      controller: 'viewResultsController'
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
  this.editTask = {};
  this.editKey = -1;
  this.listRef = null;
  // this.dateObject = new Date();
});
