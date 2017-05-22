
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Dashboard = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const Home = (resolve) => {
    require.ensure(['../components/home'], () => {
        resolve(require('../components/home')) // eslint-disable-line global-require
    })
}

const Profile = (resolve) => {
    require.ensure(['../components/profile'], () => {
        resolve(require('../components/profile')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
        children:[
            {
                name: 'dashboard.home',
                path: '',
                component: Home,
                meta: { requiresAuth: true },
            },
            {
                name: 'dashboard.profile',
                path: 'profile',
                component: Profile,
                meta: { requiresAuth: true },
            },
        ]
    }
]
