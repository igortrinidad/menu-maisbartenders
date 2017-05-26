let files = [
    // routes
    '/',

    // css files
    '/static/build/css/vendor.css',
    '/static/build/css/agency.css',

    // static images
    '/static/assets/header-bg.jpg',

    // js files
    '/static/build/js/vendor.js',
    '/app.js',
    '/static/build/js/services/register.js'
]

// install application
self.addEventListener('install', function() {
    console.log('installing')
    caches.open('ceep-files').then(cache => {
        cache.addAll(files)
    })
})

// fetch application files
self.addEventListener('fetch', function(event) {
    let order = event.request
    console.log('fetching')
    let promisseResponse = chace.match(order).then(response => {
        return response ? response : fetch(order)
    })
    event.respondWith(promisseResponse)
})
