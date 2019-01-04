const theFiles = [
    '/data/restaurants.json',
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/js/main.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    ];

//listen for install event for caching
self.addEventListener('install', function(e){
    e.waitUntil(
      caches.open('1.0').then(function(cache) {
        return cache.addAll(theFiles);
      })
    );
  });

  self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('1.0').then(function(cache) {
            return cache.addAll(theFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(caches.match(e.request).then(function(response) {
        if (response) {
            console.log(`resources already cached ! -> ${e.request}`);
            return response;
        } else {
            console.log('fetching');
            
            return fetch(e.request)
            .then(function(response) {
                // fix Response body error
                const copyResponse = response.clone();
                caches.open('1.0').then(function(cache) {
                    cache.put(e.request, copyResponse);
                })
                return response;
            })
            .catch(function(err) {
                console.error(err);
            });
        }            
    }));
});