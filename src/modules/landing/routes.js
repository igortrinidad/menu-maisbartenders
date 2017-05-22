import Index from './components/index.vue'
import appLayout from './layout/main'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    {
        name: '',
        path: '/',
        component: appLayout,
        meta: {requiresAuth: true},
        children: [
            {
                name: 'landing.index',
                path: '',
                component: Index,
                meta: { requiresAuth: false },
            }
        ]
    },
]
