app.controller('TestController', function($scope, TmdbService) {
  // Test search
  TmdbService.search("Avengers").then(function(response) {
    console.log("🔍 Search Results:", response.data.results);
  });

  // Test popular
  TmdbService.getPopular("movie").then(function(response) {
    console.log("🎥 Popular Movies:", response.data.results);
  });

  // Test genres
  TmdbService.getGenres("movie").then(function(response) {
    console.log("📂 Genres:", response.data.genres);
  });
});
