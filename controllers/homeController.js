app.controller('homeController', ['$scope', '$rootScope', '$location', 
  function($scope, $rootScope, $location) {
  
  $scope.welcome = "Welcome to Track Coach / Login and Registration";
  $scope.showRegister = false;
  $scope.showLogin = true;
  $scope.user = {};
  $rootScope.loggedIn = false;

  var ref = new Firebase("https://track-coach.firebaseio.com");

  $scope.showLoginBtn = function(){
    $scope.showRegister = false;
    $scope.showLogin = true;    
  }

  $scope.showRegisterBtn = function(){
    $scope.showRegister = true;
    $scope.showLogin = false;    
  }

  $scope.login = function() {
    ref.authWithPassword({
      email    : $scope.user.email,
      password : $scope.user.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $rootScope.loggedIn = true;
        $location.path('/team');
      }
    });
  }

  $scope.register = function() {
    ref.createUser({
      email    : $scope.user.email,
      password : $scope.user.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  }

}]);
