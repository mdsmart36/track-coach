app.controller('chartController', ['$scope', 'chartService', function($scope, chartService) {
  
    console.log(chartService.data);
    console.log(chartService.labels);

    $scope.data = [];
    $scope.data.push(chartService.data);
    $scope.labels = chartService.labels;
    $scope.series = chartService.series;

    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    //  $scope.series = ['Series A'];
    //  $scope.data = [[65, 59, 80, 81, 56, 55, 40]]; // data must be an array of arrays

}]);
