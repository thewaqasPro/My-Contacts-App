const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';

const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/vender/materialize/js/materialize.min.js',
    '/css/materialize.css',
    '/css/styles.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
]
//install process

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets)
        })
    )

})

//activate.
self.addEventListener('activate', e => {
    console.log('avtivate')
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(staticRes => {
            return staticRes || fetch(e.request).then(dynamicRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, dynamicRes.clone())
                    return dynamicRes
                })
            })
        })
    )
})
