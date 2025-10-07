// controllers/detailsController.js
app.controller('DetailsController', function($scope, $routeParams, TmdbService, WatchlistService) {
  $scope.details = {};
  $scope.recommendations = [];
  $scope.cast = [];
  $scope.watchlist = WatchlistService.getAll();

  const type = $routeParams.type || 'movie';
  const id = $routeParams.id;

  // Fetch details
  TmdbService.getDetails(type, id).then(res => {
    $scope.details = res.data;
  });

  // Fetch cast
  TmdbService.getCredits(type, id).then(res => {
    $scope.cast = res.data.cast || [];
  });

  // Fetch recommendations
  TmdbService.getRecommendations(type, id).then(res => {
    $scope.recommendations = res.data.results || [];
  });

  // Watchlist helpers
  $scope.isInWatchlist = function(itemId) {
    return WatchlistService.inList(itemId);
  };

  $scope.toggleWatchlist = function(item) {
    if ($scope.isInWatchlist(item.id)) {
      WatchlistService.remove(item.id);
    } else {
      const payload = {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.media_type || type
      };
      WatchlistService.add(payload);
    }
    $scope.watchlist = WatchlistService.getAll(); // refresh
  };
});
