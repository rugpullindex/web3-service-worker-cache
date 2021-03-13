// @format

import pkg from "../package.json";

const CACHE_NAME = `ethereum-mainnet-v${pkg.version}`;
const IMMUTABLE_CALLS = [
  "eth_getBlockByHash",
  "eth_getBlockByNumber",
  "eth_getBlockTransactionCountByHash",
  "eth_getBlockTransactionCountByNumber",
  "eth_getTransactionByBlockHashAndIndex",
  "eth_getTransactionByBlockNumberAndIndex",
  "eth_getTransactionByHash",
  "eth_getTransactionReceipt"
];

self.addEventListener("install", event => {
  console.log("Installing service worker", CACHE_NAME, event);
});

self.addEventListener("activate", event =>
  console.log("Activating service worker", CACHE_NAME, event)
);

self.addEventListener("fetch", event => {
  const clonedReq = event.request.clone();
  if (clonedReq.method !== "POST") {
    // NOTE: We recognize that this request has nothing to do with our caching
    // and so we send it back to the application.
    return event.respondWith(fetch(event.request));
  }

  let sCache;
  const res = clonedReq
    .json()
    .then(reqBody => {
      return caches.open(CACHE_NAME).then(cache => {
        sCache = cache;

        if (reqBody?.method && IMMUTABLE_CALLS.includes(reqBody.method)) {
          return cache.match(event.request);
        } else {
          throw new Error("Can't cache request");
        }
      });
    })
    .then(match => {
      if (match) {
        console.log("Cache hit");
        return match;
      } else {
        // TODO: POST cannot be used with cache, so we'll either have to use
        // cache.put manually or store data IndexedDB.
        sCache.add(event.request);
        return fetch(event.request);
      }
    })
    .catch(err => {
      console.error(err);
      return fetch(event.request);
    });

  event.respondWith(res);
});
