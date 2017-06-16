<template>
   <div>

    <section id="login" v-if="$auth.ready()">
        <div class="container">
            <div class="row m-b-30">
                <div class="col-lg-12">
                    <h2 class="section-heading">Login</h2>
                    <h4 class="text-muted m-t-30">Salve e compartilhe com os amigos seus drinks preferidos.</h4>
                </div>
            </div>

            <div class="row">

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-info btn-block facebook" @click="facebookLogin()">
                            <i class="fa fa-facebook fa-lg button-icon"></i> Entrar com Facebook
                        </button>
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-info btn-block" @click="interactions.showEmailLogin = true">
                            <i class="fa fa-email fa-lg button-icon"></i> Login com Email
                        </button>
                    </div>
                </div>
            </div>

            <div class="row m-t-20" v-if="interactions.showEmailLogin" @keydown.enter="login">

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="email" placeholder="Informe seu e-mail">
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <label>Senha</label>
                        <input class="form-control" type="password" v-model="password" placeholder="Informe sua senha">
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-xl btn-primary" @click.prevent="login" :disabled="!email || !password">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

   </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import eventObj from '@/models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'login',
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
                        localStorage.clear();
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
                        localStorage.clear();
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
                localStorage.clear();
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
