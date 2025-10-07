app.controller('TrendingController', function($scope, TmdbService, WatchlistService) {
  $scope.trending = [];
  $scope.loading = true;

  // Fetch trending
  TmdbService.getTrending("day").then(function(response) {
    $scope.trending = response.data.results;
    $scope.loading = false;
  }, function() {
    $scope.loading = false;
  });

  // Add to Watchlist
  $scope.addToWatchlist = function(item) {
    WatchlistService.add(item);
    alert(item.title || item.name + " added to Watchlist!");
  };
});
