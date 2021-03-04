// @format

self.addEventListener('install', event =>
  console.log('Installing service worker', event),
);

self.addEventListener('activate', event =>
  console.log('Activating service worker', event),
);

self.addEventListener('fetch', event => {
  console.log(event)
});
