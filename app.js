// Define Angular app
var app = angular.module('movieApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'SearchController'
    })
    .when('/watchlist', {
      templateUrl: 'views/watchlist.html',
      controller: 'WatchlistController'
    })
    .when('/details/:type/:id', {
      templateUrl: 'views/details.html',
      controller: 'DetailsController'
    })
    .when('/trending', {
      templateUrl: 'views/trending.html',
      controller: 'TrendingController'
    })
    .otherwise({
      redirectTo: '/search'
    });
});

// Just for testing API calls
app.controller('TestController', function($scope, TmdbService) {
  // Example: search movies
  TmdbService.search("Avengers").then(function(response) {
    console.log("🔍 Search Results:", response.data.results);
  });

  // Example: get popular movies
  TmdbService.getPopular("movie").then(function(response) {
    console.log("🔥 Popular Movies:", response.data.results);
  });

  // Example: get genres
  TmdbService.getGenres("movie").then(function(response) {
    console.log("🎭 Genres:", response.data.genres);
  });
});

