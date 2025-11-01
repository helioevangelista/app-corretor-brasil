const CACHE_NAME = 'corretor-brasil-final-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/app.css',
  '/scripts/app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/splash-screen.png'
];
self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (evt) => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(caches.match(evt.request).then((res)=> res || fetch(evt.request).then(fetchRes=>{ caches.open(CACHE_NAME).then(c=>c.put(evt.request, fetchRes.clone())); return fetchRes; }).catch(()=> caches.match('/index.html'))));
});
