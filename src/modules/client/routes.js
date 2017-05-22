import Index from './components/index.vue'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [

    {
        path: '/cliente',
        name: 'client-index',
        component: Index,
        meta: {requiresAuth: false},
    },
]
