import { routes as auth } from './auth'
import {routes as dashboard} from './dashboard'
import appLayout from './layout/main'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    //...auth,
    {
        name: 'app.home',
        path: '/',
        component: appLayout,
        meta: {requiresAuth: true},
        children: [
            ...dashboard
        ]
    },
]
