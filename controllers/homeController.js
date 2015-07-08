app.controller('homeController', [
  '$scope', '$rootScope', '$location', 'FIREBASE_APP',
  function($scope, $rootScope, $location, FIREBASE_APP) {

  // THIS CONTROLLER FOR LOGIN AND REGISTRATION

  $scope.welcome = "Welcome to Track Coach / Login and Registration";
  $scope.showRegister = false;
  $scope.showLogin = true;
  $scope.user = {};
  $rootScope.loggedIn = false;

  var ref = new Firebase(FIREBASE_APP);

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
        console.log("Authenticated successfully:", authData);
        $rootScope.loggedIn = true;
        $location.path('/athletes/view');
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
        alert('Successful registration. Please log in with your email and password.');
        $location.path('/login');
      }
    });
  }

}]);
