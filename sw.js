// Offline cache so the coloring book works with no Wi-Fi once loaded once.
const CACHE = "saira-coloring-v4";
const ASSETS = [
  "./", "index.html", "manifest.webmanifest",
  "apple-touch-icon.png", "icon-192.png", "icon-512.png",
  "pics/flip-flops.png", "pics/pool-bear.png", "pics/summer-fun.png",
  "pics/hello-sunshine.png", "pics/dolphins.png", "pics/camera.png",
  "pics/summer-1.png", "pics/summer-2.png", "pics/summer-3.png", "pics/summer-4.png",
  "pics/summer-5.png", "pics/summer-6.png", "pics/summer-7.png", "pics/summer-8.png",
  "pics/summer-9.png", "pics/summer-10.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
