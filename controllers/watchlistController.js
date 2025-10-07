app.controller('WatchlistController', function($scope, WatchlistService) {
  $scope.watchlist = WatchlistService.getAll();

  // Remove from watchlist
  $scope.remove = function(id) {
    WatchlistService.remove(id);
    $scope.watchlist = WatchlistService.getAll(); // refresh list
  };
});
