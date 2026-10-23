// ═══════════════════════════════════════════════════
// Service Worker — حاسبة العطور الاحترافية
// ═══════════════════════════════════════════════════

const CACHE_NAME = "atour-v3.1";
// مسارات نسبية حتى تعمل داخل مجلد المشروع على GitHub Pages
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/data.js",
  "./js/inventory.js",
  "./css/inventory.css",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json"
];

// ── Install ──
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: احذف الكاشات القديمة ──
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: الشبكة أولًا (دائمًا أحدث نسخة)، والكاش عند انقطاع الإنترنت ──
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // API calls — شبكة فقط
  if (url.hostname.includes("anthropic.com")) {
    event.respondWith(fetch(req));
    return;
  }

  // غير نفس الدومين — اتركه للمتصفح
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(response => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(req).then(cached => cached || caches.match("./index.html"))
      )
  );
});
