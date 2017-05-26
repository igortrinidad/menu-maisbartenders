let files = [
    // routes
    '/',

    // css files
    '/static/build/css/vendor.css',
    '/static/build/css/agency.css',
    '/static/build/fonts/fontawesome.css',
    '/static/build/fonts/montserrat.css',
    '/static/build/fonts/robotoslab.css',

    // static images
    '/static/assets/header-bg.jpg',

    // fonts
    '/static/build/fonts/montserrat/Montserrat-Bold.ttf',
    '/static/build/fonts/montserrat/Montserrat-Light.ttf',
    '/static/build/fonts/montserrat/Montserrat-Regular.ttf',
    '/static/build/fonts/robotoslab/RobotoSlab-Bold.ttf',
    '/static/build/fonts/robotoslab/RobotoSlab-Light.ttf',
    '/static/build/fonts/robotoslab/RobotoSlab-Regular.ttf',
    '/static/build/fonts/robotoslab/RobotoSlab-Thin.ttf',


    // js files
    '/static/build/js/vendor.js',
    '/app.js',
    '/static/build/js/services/register.js'
]

// install application
self.addEventListener('install', function() {
    caches.open('ceep-files').then(cache => {
        cache.addAll(files)
    })
})

// fetch application files
self.addEventListener('fetch', function(event) {
    let order = event.request
    let promisseResponse = chace.match(order).then(response => {
        return response ? response : fetch(order)
    })
    console.log(event);
    event.respondWith(promisseResponse)
})
