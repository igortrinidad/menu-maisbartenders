import ShowHome from './home/show.vue'
import EventShow from './events/show.vue'
import EventList from './events/list.vue'
import EventOffline from './events/offline-list.vue'
import EventShowOffline from './events/offline-show.vue'
import DrinkShow from './drinks/show.vue'
import DrinkShowOffline from './drinks/offline-show.vue'
import DrinkList from './drinks/list.vue'
import CreateDrink from './drinks/create-drink.vue'
import appLayout from './layout/main'
import UserShow from './user/show'
import UserPreferences from './user/preferences'
import NotFound from './pages/404.vue'
import Forbidden from './pages/403.vue'
import Privacy from './pages/privacy.vue'
import Contact from './pages/contact.vue'
import Simulator from './pages/simulator.vue'
import { routes as auth } from './auth'


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
                name: 'landing.events-offline.list',
                path: '/eventos-salvos',
                component: EventOffline,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.events.show-offline',
                path: '/evento-salvo/:event_slug',
                component: EventShowOffline,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.drinks.show',
                path: '/drink/:drink_slug',
                component: DrinkShow,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.drinks.show-offline',
                path: '/drink-salvo/:drink_slug',
                component: DrinkShowOffline,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.drinks.list',
                path: '/cardapio-mais-bartenders',
                component: DrinkList,
                meta: { requiresAuth: false },
            },

            {
                name: 'landing.drinks.createdrink',
                path: '/crie-seu-drink',
                component: CreateDrink,
                meta: { requiresAuth: false},
            },

            {
                name: 'landing.user.show',
                path: '/perfil',
                component: UserShow,
                meta: { requiresAuth: true},
            },

            {
                name: 'landing.user.preferences',
                path: '/preferencias',
                component: UserPreferences,
                meta: { requiresAuth: true},
            },

            ,{
                name: 'landing.403',
                path: '/403',
                component: Forbidden
            },
            {
                name: 'landing.404',
                path: '/not-found',
                component: NotFound
            },
            {
                name: 'landing.privacy',
                path: '/termos-de-uso-e-privacidade',
                component: Privacy

            },
            {
                name: 'landing.contact',
                path: '/contato',
                component: Contact

            },
            {
                name: 'landing.simulator',
                path: '/simulador',
                component: Simulator

            },
            {
                path: '*',
                component: NotFound
            },

        ]
    },
]
