import ShowHome from './home/show.vue'
import EventShow from './events/show.vue'
import EventList from './events/list.vue'
import DrinkShow from './drinks/show.vue'
import DrinkList from './drinks/list.vue'
import appLayout from './layout/main'
import UserShow from './user/show'
import UserPreferences from './user/preferences'
import { routes as auth } from './auth'

//To test chart JS 
import TestChart from './drinks/test-chart.vue'
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    {
        name: '',
        path: '/',
        component: appLayout,
        meta: {requiresAuth: true},
        children: [
            ...auth,
            {
                name: 'landing.home.show',
                path: '',
                component: ShowHome,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.events.show',
                path: '/evento/:event_slug',
                component: EventShow,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.events.list',
                path: '/eventos',
                component: EventList,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.drinks.show',
                path: '/drink/:drink_slug',
                component: DrinkShow,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.drinks.list',
                path: '/cardapio-mais-bartenders',
                component: DrinkList,
                meta: { requiresAuth: false },
            },

            {
                name: 'landing.user.show',
                path: '/perfil',
                component: UserShow,
                meta: { requiresAuth: true, auth:['guest']},
            },

            {
                name: 'landing.user.preferences',
                path: '/preferencias',
                component: UserPreferences,
                meta: { requiresAuth: true,  auth:['guest']},
            },

            {
                name: 'landing.user.testchart',
                path: '/test-chart',
                component: TestChart,
                meta: { requiresAuth: false},
            },
        ]
    },
]
