<template>
    <div class="first-container">

        <main-header :title="'Cadastre-se'" />

        <!-- Logo + Title -->
        <div class="container">
            <div class="svg-container">
                <svg viewBox="0 0 90 90">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <g transform="translate(-2.7877853,62.500941)">
                        <g transform="matrix(3.9793611,0,0,3.9793611,-3.2721775,-67.931684)">
                            <path class="non-fill-xs animated" stroke="url(#linear)"
                                d="M 14.585786,11 12.292893,8.7071068 c -0.390524,-0.3905243 -0.390524,-1.0236893 0,-1.4142136 0.390524,-0.3905243 1.02369,-0.3905243 1.414214,0 l 4,3.9999998 c 0.390524,0.390524 0.390524,1.02369 0,1.414214 l -4,4 c -0.390524,0.390524 -1.02369,0.390524 -1.414214,0 -0.390524,-0.390525 -0.390524,-1.02369 0,-1.414214 L 14.585786,13 H 7 C 6.4477152,13 6,12.552285 6,12 6,11.447715 6.4477152,11 7,11 Z M 3.428327,6.8496192 C 6.2728037,2.115615 12.416377,0.58385025 17.150381,3.428327 21.884385,6.2728037 23.41615,12.416377 20.571673,17.150381 17.727196,21.884385 11.583624,23.41615 6.8496192,20.571673 5.4312948,19.719458 4.2684755,18.550512 3.4333679,17.162236 3.148683,16.688978 3.3015515,16.074544 3.7748093,15.789859 4.2480671,15.505175 4.862501,15.658043 5.147186,16.131301 5.814698,17.240967 6.7434521,18.174615 7.8796954,18.857338 11.666899,21.13292 16.581757,19.907508 18.857338,16.120305 21.13292,12.333101 19.907508,7.418243 16.120305,5.1426616 12.333101,2.8670802 7.418243,4.092492 5.1426616,7.8796954 4.8582139,8.3530958 4.2438566,8.5062723 3.7704562,8.2218246 3.2970558,7.9373769 3.1438793,7.3230197 3.428327,6.8496192 Z"
                            />
                        </g>
                    </g>
                </svg>
            </div>
            <h4 class="title-section m-b-20 m-t-10">Salve e compartilhe com os amigos seus drinks preferidos.</h4>

            <!-- Login Options -->
            <div class="text-center m-b-10">
                <button class="btn btn-mb-facebook btn-block m-b-10" @click="facebookLogin()">
                    Cadastrar Facebook
                </button>

                <button class="btn btn-mb-info btn-block" @click="interactions.showEmailLogin = true">
                    Cadastrar Email
                </button>
            </div>
        </div>

        <!-- Signup -->
        <div class="container-colored" :class="{ 'bottom-fixed': !interactions.showEmailLogin }">
            <div id="login" v-if="$auth.ready()">
                <div class="container">

                    <div class="card" v-if="interactions.showEmailLogin">
                        <div class="card-body card-padding">
                            <div class="row m-t-20">
                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-name">Nome</label>
                                        <input id="signup-name" class="form-control" v-model="guest.name" placeholder="Nome">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-lastname">Sobrenome</label>
                                        <input id="signup-lastname" class="form-control" v-model="guest.last_name" placeholder="Sobrenome">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-email">Email</label>
                                        <input id="signup-email" class="form-control" v-model="guest.email" placeholder="Email">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-phone">Telefone</label>
                                        <input id="signup-phone" class="form-control" v-model="guest.phone" placeholder="Telefone">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-password">Senha</label>
                                        <input id="signup-password" class="form-control" type="password" v-model="guest.password" placeholder="Senha">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-confirm">Confirmar senha</label>
                                        <input id="signup-confirm" class="form-control" type="password" v-model="guest.password_confirmation" placeholder="Confirmar senha">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="signup-photo">Foto</label>
                                        <input id="signup-photo" class="form-control" type="file" v-on:change="loadPhoto">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group text-center">
                                        <button class="btn btn-mb-primary" @click.prevent="signup()">Cadastrar</button>
                                    </div>
                                </div>

                                <hr>

                            </div>
                        </div>
                    </div>

                    <div class="card m-b-0">
                        <div class="card-body card-padding">
                            <div class="text-center">
                                <h5 class="card-title">Já possui cadastro?</h5>
                                <router-link tag="button" class="btn btn-xs btn-mb-primary" :to="{name: 'landing.auth.login'}">Faça login</router-link>
                                <router-link tag="button" class="btn btn-xs btn-mb-primary" :to="{name: 'landing.home.show'}" exact>Voltar para home</router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import eventObj from '@/models/Event.js'

    import mainHeader from '@/components/main-header.vue'

    var Swiper = require('swiper')

    export default {
        name: 'signup',
        components: {
            mainHeader
        },
        data () {
            return {
                interactions: {
                    showEmailLogin: false,
                },
                guest: {
                    name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    photo: null
                }
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){

            if(window.cordova){
                openFB.init({appId: '262783620860879'});
            }
        },
        methods: {

            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser', 'setLoading']),

            signup() {
                let that = this
                let formData = new FormData();

                that.setLoading({is_loading: true, message: ''})

                Object.keys(that.guest).map(function (key, index) {
                    formData.append(key, that.guest[key])
                });

                 that.$http.post('/guest/create', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                 .then(function (response) {
                 successNotify('', 'Cadastro realizado com sucesso, faça o login.')

                     that.$router.push({path: '/login'})
                     that.setLoading({is_loading: false, message: ''})

                 })
                 .catch(function (error) {
                    errorNotify('', 'Houve um erro ao realizar o cadastro.')
                    that.setLoading({is_loading: false, message: ''})
                 });
            },

            loadPhoto(event){
                this.guest.photo = event.target.files[0]
            },

            /*
             * FACEBOOK Methods
             */
            facebookLogin(){
                let that = this
                that.setLoading({is_loading: true, message: ''})

                if(window.cordova){
                    openFB.login(
                        function(response) {
                            if(response.status === 'connected') {
                                that.statusChangeCallback(response)
                            } else {
                                alert('Facebook login failed: ' + response.error);

                                var events = localStorage.getItem('events');
                                localStorage.clear();
                                localStorage.setItem('events', events);

                                if(window.cordova){
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email'});
                }

                if(!window.cordova){
                    FB.login(function(response) {
                        that.statusChangeCallback(response)
                    }, {scope: 'public_profile,email,publish_actions'});
                }
            },

            statusChangeCallback(response) {
                let that = this
                if (response.status === 'connected') {
                    that.getUserInfo(response.authResponse.accessToken);
                } else {
                    errorNotify('', 'É necessário fazer login para continuar.')
                }
                that.setLoading({is_loading: false, message: ''})
            },

            getUserInfo(accessToken) {
                let that = this

                if(window.cordova){
                    openFB.api({
                        path: '/v2.8/me',
                        params: { "access_token": accessToken, "fields":"id,name,first_name,last_name,email" },
                        success: function(response) {

                            response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                            response.access_token = accessToken;
                            response.role = 'guest';

                            that.socialLogin(response)
                        },
                        error: that.errorHandler
                    })
                }

                if(!window.cordova){
                    FB.api('/me', {fields: 'name,first_name, last_name, email' }, function(response) {
                        response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                        response.access_token = accessToken;
                        response.role = 'guest';

                        that.socialLogin(response)
                    });
                }
            },

            socialLogin(response){
                let that = this
                localStorage.setItem('provider', 'facebook')
                that.$http.post('/auth/social', response)
                    .then(function (response) {

                        that.authSetToken(response.data.access_token) // this is a Vuex action
                        that.authSetUser(response.data.user) // this is a Vuex action

                        successNotify('', 'Login efetuado com sucesso.')
                        that.setLoading({is_loading: false, message: ''})

                        that.$router.push(that.$route.query.redirect ? that.$route.query.redirect : '/')
                    })
                    .catch(function (error) {
                        console.log(error)
                        errorNotify('Ops!', 'Erro ao efetuar login.')

                        var events = localStorage.getItem('events');
                        localStorage.clear();
                        localStorage.setItem('events', events);

                        if(window.cordova){
                            window.cookies.clear();
                        }
                    });
            },

            errorHandler(error) {
                that.setLoading({is_loading: false, message: ''})
                errorNotify('', error.message);
                localStorage.clear();
                if(window.cordova){
                    window.cookies.clear();
                }
            }

        }
    }
</script>

<style scoped>

    .text-selected {
        background-color: #FED136;
        font-size: 22px;
    }

    #contact {
        background-color: #F7F7F7;
    }
</style>
