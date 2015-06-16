app.controller('homeController', ['$scope', function($scope) {
  $scope.welcome = "Welcome to Track Coach / Login and Registration";
  $scope.showRegister = false;
  $scope.showLogin = true;
  $scope.user = {};

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
