self.addEventListener('fetch', function(event) {
    let order = event.request

    let promisseResponse = chaces.open('ceep-images').then(cache => {
        return cache.match(order)
    }).then(response => {
        return response ? response : fetch(order)
    })

    event.respondWith(promisseResponse)

})
