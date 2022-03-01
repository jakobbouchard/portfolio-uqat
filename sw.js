const CACHE_NAME = 'site-cache-v3';
const urlsToCache = [
	'/',
	'/styles/main.css',
	'/scripts/main.js',
	'/assets/fonts/Atkinson-Hyperlegible/Bold.woff2',
	'/assets/fonts/Atkinson-Hyperlegible/BoldItalic.woff2',
	'/assets/fonts/Atkinson-Hyperlegible/Italic.woff2',
	'/assets/fonts/Atkinson-Hyperlegible/Regular.woff2',
	'/apple-touch-icon.png',
	'/icon-192.png',
	'/icon-512.png',
	'/icon.svg',
];

self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}

				return fetch(event.request).then(
					function(response) {
						// Check if we received a valid response
						if(!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						// IMPORTANT: Clone the response. A response is a stream
						// and because we want the browser to consume the response
						// as well as the cache consuming the response, we need
						// to clone it so we have two streams.
						const responseToCache = response.clone();

						caches.open(CACHE_NAME)
							.then(function(cache) {
								cache.put(event.request, responseToCache);
							})
							.catch(function(err) {
								console.error('Error adding to cache', err);
							});

						return response;
					}
				);
			})
		);
});
