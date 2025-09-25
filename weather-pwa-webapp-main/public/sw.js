

// const CACHE_NAME = "weather-cache-v2";
// const urlsToCache = ["/", "/index.html", "/manifest.json"];


// self.addEventListener("install", (event) => {
// event.waitUntil(
// caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
// );
// });


// self.addEventListener("fetch", (event) => {
// event.respondWith(
// caches.match(event.request).then((response) => {
// return (
// response ||
// fetch(event.request).then((res) => {
// if (event.request.method === "GET" && event.request.url.startsWith("http")) {
// const resClone = res.clone();
// caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
// }
// return res;
// }).catch(() => response)
// );
// })
// );
// });

const CACHE_NAME = "weather-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html"
];

// Cài đặt SW: cache sẵn các file cơ bản
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Kích hoạt SW: xóa cache cũ khi có version mới
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: ưu tiên cache, fallback mạng, offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request)
        .then((res) => {
          if (
            event.request.method === "GET" &&
            event.request.url.startsWith("http")
          ) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(event.request, resClone)
            );
          }
          return res;
        })
        .catch(() => {
          // Nếu request là navigation (chuyển trang) → trả về offline.html
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});
