const CACHE_NAME = 'domovoy-offline-v1';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Пытаемся добавить файл, но если его нет - не ломаем установку
            return cache.add(OFFLINE_URL).catch(err => {
                console.warn('Не удалось закешировать offline.html:', err);
            });
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // Показываем офлайн-страницу, если она есть в кеше
                return caches.match(OFFLINE_URL).then(response => {
                    if (response) {
                        return response;
                    }
                    // Если страницы нет, показываем простой текст
                    return new Response('Нет соединения. Позвоните нам: +7 (920) 420-82-62', {
                        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                    });
                });
            })
        );
    }
});
