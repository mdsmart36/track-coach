app.controller('linksController', [
  '$scope', 
  function($scope) {
  
  $scope.welcome = "Links and Resources";
  $scope.links = [
    {imgSource: 'usatf.png', name: 'USA Track and Field', description: 'USA Track & Field (USATF) is the National Governing Body for track & field, long-distance running and race walking in the United States.', URL: 'http://www.usatf.org'},
    {imgSource: 'flotrack.png', name: 'FloTrack', description: 'See the latest running videos on track and field events around the US and the world.  Watch running videos and interviews with the greatest coaches and athletes. Track is Back!', URL: 'http://www.flotrack.org'},
    {imgSource: 'Running-Times-Logo.gif', name: 'Running Times', description: 'Running Times is the go-to source of information and inspiration for the dedicated, active runner and fan. Our mission is to enable runners to take their performance and enjoyment of running to a higher level. We go beyond basic tips, answering "why" as well as "how," providing fresh knowledge and perspectives through trusted content that reflects the runner\'s view of the world, inspires and motivates.', URL: 'http://www.runnersworld.com/running-times'},
    {imgSource: 'trackandfieldnewslogo.gif', name: 'Track and Field News', description: 'The Bible of the Sport. Professional publication offering news and lists of the best marks made in elite competitions.', URL: 'http://www.trackandfieldnews.com'},
    {imgSource: 'DirectAthletics.png', name: 'Direct Athletics', description: 'Whether you are a meet director, timer, conference administrator or an athlete, DirectAthletics makes your experience better. Thousands of meets and millions of athletes have benefited from our websites and software.', URL: 'http://www.directathletics.com/index.html'}
    ];

  $scope.showDescription = -1;

  $scope.showDiv = function(index) {
    $scope.showDescription = index;
  };

  $scope.hideDiv = function() {
    $scope.showDescription = -1;
  }
}]);
