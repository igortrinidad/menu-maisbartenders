<template>
   <div class="first-container">

        <main-header :title="'Login'" />

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
                    Login Facebook
                </button>

                <button class="btn btn-mb-info btn-block" @click="interactions.showEmailLogin = true">
                    Login Email
                </button>
            </div>
        </div>

        <!-- Login -->
        <div class="container-colored" :class="{ 'bottom-fixed': !interactions.showEmailLogin }">
            <div id="login" v-if="$auth.ready()">
                <div class="container">

                    <div class="card" v-if="interactions.showEmailLogin">
                        <div class="card-body card-padding">

                            <div class="row m-t-20" @keydown.enter="login">
                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="login-email">Email</label>
                                        <input id="login-email" type="email" class="form-control" v-model="email" placeholder="Informe seu e-mail">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="login-password">Senha</label>
                                        <input id="login-password" class="form-control" type="password" v-model="password" placeholder="Informe sua senha">
                                    </div>
                                </div>

                                <div class="col-md-6 col-md-offset-3 col-xs-12">
                                    <div class="form-group text-center">
                                        <button class="btn btn-mb-primary" @click.prevent="login" :disabled="!email || !password">Login</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="card m-b-0">
                        <div class="card-body card-padding">
                            <div class="text-center">
                                <h5 class="card-title">Não possui cadastro?</h5>
                                <router-link tag="button" class="btn btn-xs btn-mb-primary" :to="{name: 'landing.auth.signup'}" exact>Cadastre-se aqui</router-link>
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
    import { mapGetters, mapActions } from 'vuex'
    import eventObj from '@/models/Event.js'

    import mainHeader from '@/components/main-header.vue'

    var Swiper = require('swiper')

    export default {
        name: 'login',

        components: {
            mainHeader
        },

        data () {
            return {
                interactions: {
                    showEmailLogin: false,
                },
                email: null,
                password: null,
                redirect: null
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){

            if(window.cordova){

                openFB.init({appId: '262783620860879', tokenStore: localStorage});
            }
        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser', 'setLoading', 'setUserDrinkLikes']),

            login () {
                var that = this
                that.setLoading({is_loading: true, message: ''})

                this.$auth.login({
                    url:'guest/auth/login',
                    fetchUser:true,
                    data:{
                        email: this.email,
                        password: this.password,
                    },
                    rememberMe: this.rememberMe,
                    redirect: this.handleRedirect(),
                    success (response) {
                        this.authSetToken(response.data.access_token) // this is a Vuex action
                        this.authSetUser(response.data.user) // this is a Vuex action
                        that.setLoading({is_loading: false, message: ''})
                        successNotify('', 'Login efetuado com sucesso.')
                    },
                    error (error) {
                        that.setLoading({is_loading: false, message: ''})
                        errorNotify('Ops!', 'Login ou senha inválidos. Dica: Tente pelo Facebook.');

                        var events = localStorage.getItem('events');
                        localStorage.clear();
                        localStorage.setItem('events', events);

                        if(window.cordova){
                            window.cookies.clear();
                        }
                    }
                })

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
                                that.setLoading({is_loading: false, message: ''})
                                alert('Facebook login failed: ' + response.error);
                                if(window.cordova){
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email,publish_actions'});
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
                    that.setLoading({is_loading: false, message: ''})
                }
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

                            that.setLoading({is_loading: false, message: ''})
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

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/auth/social', response)
                    .then(function (response) {

                        that.authSetToken(response.data.access_token) // this is a Vuex action
                        that.authSetUser(response.data.user) // this is a Vuex action

                        that.setLoading({is_loading: false, message: ''})

                        successNotify('', 'Login efetuado com sucesso.')

                        that.getUserDrinkLikes()

                        that.$router.push(that.handleRedirect())

                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Erro ao efetuar login.')
                        that.setLoading({is_loading: false, message: ''})

                        var events = localStorage.getItem('events');
                        localStorage.clear();
                        localStorage.setItem('events', events);

                        if(window.cordova){
                            window.cookies.clear();
                        }
                    });
            },

            handleRedirect(){
                let that = this
                let redirect_to

                if (that.$route.query.redirect_back) {
                    redirect_to = that.$route.query.redirect_back
                } else {
                    redirect_to = that.$route.query.redirect
                }

                return redirect_to ? redirect_to : '/'
            },

            errorHandler(error) {
                that.setLoading({is_loading: false, message: ''})
                errorNotify('', error.message);

                var events = localStorage.getItem('events');
                localStorage.clear();
                localStorage.setItem('events', events);

                if(window.cordova){
                    window.cookies.clear();
                }
            },

            getUserDrinkLikes(){
                let that = this

                that.$http.get('/guest/drinkLikes')
                    .then(function (response) {

                        that.setUserDrinkLikes(response.data.likes)

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style scoped>

    .text-selected{
        background-color: #FED136;
        font-size: 22px;
    }

    #contact{
        background-color: #F7F7F7;
    }

    .btn:active{
        transform: scale(0.99);
    }
</style>
