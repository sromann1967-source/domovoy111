// Название кеша (если обновите офлайн-страницу, поменяйте v1 на v2)
const CACHE_NAME = 'domovoy-offline-v1';
const OFFLINE_URL = 'offline.html';

// Устанавливаем Service Worker и сохраняем офлайн-страницу в память браузера
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Добавляем нашу офлайн-страницу в кеш
            return cache.addAll([OFFLINE_URL]);
        })
    );
    // Активируем сразу, не дожидаясь закрытия вкладок
    self.skipWaiting();
});

// Перехватываем все запросы
self.addEventListener('fetch', (event) => {
    // Если пользователь пытается загрузить страницу (HTML)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // Если сеть недоступна, показываем сохраненную офлайн-страницу
                return caches.match(OFFLINE_URL);
            })
        );
    }
});
