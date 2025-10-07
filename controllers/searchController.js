app.controller('SearchController', function($scope, TmdbService, WatchlistService) {
  // UI state
  $scope.showFilters = false;
  $scope.loading = false;

  // Search state
  $scope.query = '';
  $scope.results = [];
  $scope.popular = [];
  $scope.genres = [];

  // Filters
  $scope.type = 'movie';
  $scope.selectedGenre = '';
  $scope.selectedYear = '';
  $scope.selectedRating = '';
  $scope.selectedSort = 'popularity.desc';

  // Init → load genres + popular movies
  function init() {
    TmdbService.getGenres('movie').then(function(res) {
      $scope.genres = res.data.genres;
    });

    TmdbService.getPopular('movie').then(function(res) {
      $scope.popular = res.data.results;
    });
  }

  init();

  // Toggle filter panel
  $scope.toggleFilters = function() {
    $scope.showFilters = !$scope.showFilters;
  };

  // 🔍 Manual search
  $scope.search = function() {
    if (!$scope.query || $scope.query.trim() === '') return;
    $scope.loading = true;

    TmdbService.search($scope.query, 1).then(function(res) {
      $scope.results = res.data.results || [];
      $scope.loading = false;
    }, function() {
      $scope.results = [];
      $scope.loading = false;
    });
  };

  // 🔍 Auto search (on typing)
  $scope.searchAuto = function() {
    if ($scope.query && $scope.query.trim() !== '') {
      $scope.search();
    }
  };

  // 🎛 Apply filters
  $scope.applyFilters = function() {
    $scope.loading = true;
    let filters = {};

    if ($scope.selectedGenre) filters.with_genres = $scope.selectedGenre;
    if ($scope.selectedYear) filters.primary_release_year = $scope.selectedYear;
    if ($scope.selectedSort) filters.sort_by = $scope.selectedSort;
    if ($scope.selectedRating) filters['vote_average.gte'] = $scope.selectedRating;

    TmdbService.discover($scope.type, filters, 1).then(function(res) {
      $scope.results = res.data.results || [];
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  };

  // ❌ Clear filters
  $scope.clearFilters = function() {
    $scope.selectedGenre = '';
    $scope.selectedYear = '';
    $scope.selectedRating = '';
    $scope.selectedSort = 'popularity.desc';
    $scope.applyFilters();
  };

  // ⭐ Watchlist helpers
  $scope.isInWatchlist = function(id) {
    const list = WatchlistService.getAll();
    return list.some(item => item.id === id);
  };

  $scope.toggleWatchlist = function(item) {
    if ($scope.isInWatchlist(item.id)) {
      WatchlistService.remove(item.id);
    } else {
      WatchlistService.add(item);
    }
  };
});
