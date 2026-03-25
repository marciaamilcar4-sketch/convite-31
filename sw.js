const CACHE_NAME='adj31-v1.0.3';

self.addEventListener('install',function(e){
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){return k!==CACHE_NAME;})
            .map(function(k){return caches.delete(k);})
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch',function(e){
  // Sempre vai buscar versão nova ao servidor
  e.respondWith(
    fetch(e.request,{cache:'no-store'})
    .catch(function(){
      return caches.match(e.request);
    })
  );
});
