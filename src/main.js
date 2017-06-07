import Vue from 'vue'
import App from './App.vue';
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import messages from './utils/validator/pt_BR';
import VeeValidate, {Validator} from 'vee-validate';
import {apiUrl, facebookClientId, googleClientId} from './config'
import VueSweetAlert from 'vue-sweetalert'

//FACEBOOK SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9&appId=262783620860879";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Router
Vue.router = router

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = apiUrl;

Vue.axios.interceptors.response.use(function (response) {

    return response;

}, function (error) {

    const { response } = error


    // If token is expired not provided or invalid, bad request, internal server error then redirect to login.
    if ([401, 403].indexOf(response.status) > -1) {

        //set token and user as null
        store.dispatch('authSetToken', '')
        store.dispatch('authSetUser', '')

        //redirect
        router.push({ name: 'landing.auth.login' })

        errorNotify('Ops!', 'Ocorreu um erro ao processar sua requisição.')
    }

    console.log(error);

    if(error.status == 401){
        errorNotify('Ops!', 'Efetue o login novamente.')
    }

    if ([500].indexOf(response.status) > -1) {

        errorNotify('Ops!', 'Ocorreu algum erro em sua requisição, tente novamente mais tarde.')
    }

    //return  response error
    return Promise.reject(response);
});

Vue.use(VueAuth, {
    auth: require('./plugins/auth-driver/bearer'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'role',
    facebookOauth2Data: {
        clientId: facebookClientId
    },
    googleOauth2Data: {
        clientId: googleClientId
    },
    refreshData: {enabled: false},

    parseUserData(data){
        store.dispatch('authSetUser', data.data)
        return data.data
    }
});

Validator.updateDictionary({
    pt_BR: {
        messages
    }
});

Vue.use(VeeValidate, {locale: 'pt_BR'});

Vue.use(VueSweetAlert)

// Start
var component = App;
component.router = Vue.router;
component.store = store
new Vue(component).$mount('#root');
