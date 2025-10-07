// services/watchlistService.js
app.service('WatchlistService', function() {
  const KEY = 'cine_watchlist_v1';
  function load(){ return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }

  this.getAll = function(){ return load(); };
  this.add = function(item){
    const list = load();
    if (!list.find(i => i.id === item.id)) {
      list.push(item);
      save(list);
    }
  };
  this.remove = function(id){
    const list = load().filter(i => i.id !== id);
    save(list);
  };
  this.inList = function(id){
    return load().some(i => i.id === id);
  };
});
