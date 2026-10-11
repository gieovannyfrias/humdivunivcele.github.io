const CACHE_NAME = 'humdivunivcele-cache-v2';

// Rutas relativas directas optimizadas para servidores corporativos y GitHub Pages
const APP_SHELL = [
  'index.html',
  'offline.html',
  'app.js'
];

// 1. Instalación Tolerante a Errores (Mapeo individual)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Descargando componentes corporativos...');
      
      // Mapeo tolerante: si un archivo falla, el SW no se rompe
      return Promise.all(
        APP_SHELL.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`[SW Warning] No se pudo precargar: ${url}.`, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Activación y Limpieza de Cachés Antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null))
      )
    ).then(() => self.clients.claim())
  );
});

// 3. Estrategia de Red con Caída a Caché (Network First)
self.addEventListener('fetch', event => {
  // Filtrar esquemas que no sean HTTP/HTTPS (como chrome-extension:// o data:)
  if (!event.request.url.startsWith('http')) return;

  // Solo interceptar métodos GET
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // CORRECCIÓN: Permitir respuestas 'basic' (mismo origen) y 'cors' (CDN de fuentes, APIs externas, etc.)
        const isSavantStatus = networkResponse.status === 200 || networkResponse.status === 0;
        const isValidType = networkResponse.type === 'basic' || networkResponse.type === 'cors';

        if (!networkResponse || !isSavantStatus || !isValidType) {
          return networkResponse;
        }

        const copy = networkResponse.clone();
        event.waitUntil(
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
        );
        return networkResponse;
      })
      .catch(() => {
        // MODO OFFLINE ACTIVO
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            // Contingencia para navegación HTML
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('offline.html').then(fallback => {
                return fallback || caches.match('/offline.html');
              });
            }

            // CORRECCIÓN: SVG con namespace oficial e internacionalizado (xmlns)
            if (event.request.headers.get('accept')?.includes('image/')) {
              return new Response(
                '<svg role="img" aria-label="Offline" xmlns="http://w3.org" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22 9M2 9a16 16 0 0 1 9.57-3.83"/></svg>', 
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }

            // Contingencia genérica de texto para scripts corporativos o datos rotos
            return new Response('Servicio de Seguridad Temporalmente Desconectado.', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
            });
          });
      })
  );
});
