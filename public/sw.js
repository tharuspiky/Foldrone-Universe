const CACHE='foldrone-v17-1';
const CORE=['/','/manifest.webmanifest','/assets/foldrone-universe-bg.jpg','/assets/foldrone-wordmark.webp','/assets/foldrone-play-wordmark.webp','/assets/foldrone-studio-wordmark.webp','/assets/foldrone-workspace-logo.webp','/assets/foldrone-pwa-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return; const u=new URL(event.request.url); if(u.origin!==location.origin)return; event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{const copy=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return r}).catch(()=>caches.match('/')))});
