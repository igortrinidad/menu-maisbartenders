import store from '../store'
import {isEmpty} from 'lodash'
import {localStorageGetItem} from '../utils/local'

const needAuth = (auth, token) => auth !== undefined && auth && isEmpty(token)
const preventsLogged = prevents => prevents === true

const beforeEach = (to, from, next) => {

    //Clear the selected category when events list
    if(to.name == 'landing.events.list' || to.name == 'landing.events-offline.list'){
        localStorage.removeItem('selected_category')
    }

    let token = store.state.Auth.token
    const auth = to.meta.requiresAuth
    const isLogged = store.getters.isLogged
    const prevents = to.meta.preventsLogged
    /**
     * If there's no token stored in the state
     * then check localStorage:
     */
    if (isEmpty(token)) {
        const localStoredToken = localStorageGetItem('token')
        const localStoredUser = localStorageGetItem('user')

        /**
         * Do we have token and user local stored?
         * If so then use it!
         */
        if (localStoredToken !== undefined &&
            localStoredToken !== null &&
            localStoredUser !== undefined &&
            localStoredUser !== null
        ) {
            token = localStoredToken.token
            store.dispatch('authSetToken', token)
            store.dispatch('authSetUser', localStoredUser.user)
        }
    }

    //prevents user to access login / signup routes
    if (isLogged && preventsLogged(prevents)) {
        return next({ name: from.name })
    }

    /**
     * If route doesn't require authentication
     * OR we have a token then let the route
     * be normally accessed.
     */
    if (!needAuth(auth, token)) {
        next()
    }

    /**
     * Otherwise  if authentication is required
     * AND the token is empty, then redirect to
     * login.
     */
    if (needAuth(auth, token)) {
        next({name: 'landing.auth.login'})
    }

    $('html, body').stop().animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
}

export default beforeEach
