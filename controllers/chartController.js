app.controller('chartController', ['$scope', 'chartService', function($scope, chartService) {  
    $scope.data = [];
    $scope.data.push(chartService.data); // $scope.data must be a two-dimensional array
    $scope.labels = chartService.labels;
    $scope.series = chartService.series; // $scope.series only needed with multiple sets of data
    $scope.athlete = chartService.athlete;
    $scope.event = chartService.event;

    $scope.print = function() {
      window.print();
    }
}]);
