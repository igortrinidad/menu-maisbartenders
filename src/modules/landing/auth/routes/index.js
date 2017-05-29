
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Login = (resolve) => {
    require.ensure(['../components/login'], () => {
        resolve(require('../components/login')) // eslint-disable-line global-require
    })
}

const Logout = (resolve) => {
    require.ensure(['../components/logout'], () => {
        resolve(require('../components/logout')) // eslint-disable-line global-require
    })
}

const Signup = (resolve) => {
    require.ensure(['../components/signup'], () => {
        resolve(require('../components/signup')) // eslint-disable-line global-require
    })
}

const LoginSocial = (resolve) => {
    require.ensure(['../components/login_social.vue'], () => {
        resolve(require('../components/login_social')) // eslint-disable-line global-require
    })
}

export default [
    {
        name: 'landing.auth.login',
        path: '/login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        name: 'landing.auth.logout',
        path: '/login',
        component: Logout,
        meta: { requiresAuth: false },
    },
    {
        path: '/login/:type',
        name: 'oauth2-type',
        component: LoginSocial
    },
    {
        name: 'landing.auth.signup',
        path: '/cadastre-se',
        component: Signup,
        meta: { requiresAuth: false },
    },
]
