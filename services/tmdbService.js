app.constant('API_KEY', '13f3fd4c1a24cb011576f887c53e0cac');
app.constant('BASE_URL', 'https://api.themoviedb.org/3');

app.service('TmdbService', function($http, API_KEY, BASE_URL) {
  
  // 🔍 Search (movies & TV shows)
  this.search = function(query, page = 1) {
    return $http.get(BASE_URL + '/search/multi', {
      params: { api_key: API_KEY, query: query, page: page }
    });
  };

  // 🎥 Popular movies/TV shows
  this.getPopular = function(type = 'movie', page = 1) {
    return $http.get(BASE_URL + '/' + type + '/popular', {
      params: { api_key: API_KEY, page: page }
    });
  };

  // 📂 Genres
  this.getGenres = function(type = 'movie') {
    return $http.get(BASE_URL + '/genre/' + type + '/list', {
      params: { api_key: API_KEY }
    });
  };

  // ⭐ Recommendations
  this.getRecommendations = function(type, id) {
    return $http.get(BASE_URL + '/' + type + '/' + id + '/recommendations', {
      params: { api_key: API_KEY }
    });
  };

  // 📄 Details (for single movie/show)
  this.getDetails = function(type, id) {
    return $http.get(BASE_URL + '/' + type + '/' + id, {
      params: { api_key: API_KEY }
    });
  };

  // 🎭 Credits (cast & crew)
  this.getCredits = function(type, id) {
    return $http.get(BASE_URL + '/' + type + '/' + id + '/credits', {
      params: { api_key: API_KEY }
    });
  };

  // 🔎 Discover movies/TV with filters
  this.discover = function(type = "movie", filters = {}, page = 1) {
    let params = { api_key: API_KEY, page: page };
    Object.assign(params, filters); // merge filters
    return $http.get(BASE_URL + "/discover/" + type, { params: params });
  };

  // 🔥 Trending movies/TV shows
  this.getTrending = function(timeWindow = "day", page = 1) {
    return $http.get(BASE_URL + "/trending/all/" + timeWindow, {
      params: { api_key: API_KEY, page: page }
    });
  };

});
