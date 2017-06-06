import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
import {routes as landingRoutes} from '../modules/landing'
import {routes as adminRoutes} from '../modules/admin'
import {routes as clientRoutes} from '../modules/client'

Vue.use(Router)

const routes = [...landingRoutes, ...clientRoutes, ...adminRoutes]

const router = new Router({
    routes,
    linkActiveClass: 'active',
    //mode: 'history', // do not use /#/.
})

/**
 * Before a route is resolved we check for
 * the token if the route is marked as
 * requireAuth.
 */
router.beforeEach(beforeEach)

export default router
