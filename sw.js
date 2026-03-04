const CACHE_NAME = 'oficio-santa-marta-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/audio/00-abertura.mp3',
    '/assets/audio/01-apresentacao.mp3',
    '/assets/audio/02-secao1-local.mp3',
    '/assets/audio/03-secao1-acoes.mp3',
    '/assets/audio/04-secao1-caracteristicas.mp3',
    '/assets/audio/05-secao2-formalizacao.mp3',
    '/assets/audio/06-secao3-monitoramento.mp3',
    '/assets/audio/07-secao4-legal.mp3',
    '/assets/audio/08-secao5-ods.mp3',
    '/assets/audio/09-secao6-contribuicao.mp3',
    '/assets/audio/10-secao7-8-compromisso.mp3',
    '/assets/audio/11-secao9-limites.mp3',
    '/assets/audio/12-secao10-requerimento.mp3',
    '/assets/audio/13-assinatura.mp3'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar requisições e servir do cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache se existir, senão busca da rede
                return response || fetch(event.request);
            })
    );
});

// Atualização do cache
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});