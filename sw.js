const CACHE_NAME = 'wika-cinema-v3';
const assets = [
    '/My-cinema-/',
    '/My-cinema-/index.html',
    '/My-cinema-/manifest.json',
    'https://i.ibb.co/zTr7jm5M/Picsart-26-01-16-01-39-26-682.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
