<template>
    <div>

        <section id="login" v-if="$auth.ready()">
            <div class="container">
                <div class="row m-b-30">
                    <div class="col-lg-12">
                        <h2 class="section-heading">Cadastre-se</h2>
                        <h4 class="text-muted m-t-30">Salve e compartilhe com os amigos seus drinks preferidos.</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <button class="btn btn-info btn-block facebook" @click="facebookLogin()">
                                <i class="fa fa-facebook fa-lg button-icon"></i> Cadastre-se com Facebook
                            </button>
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <button class="btn btn-info btn-block" @click="interactions.showEmailLogin = true">
                                <i class="fa fa-email fa-lg button-icon"></i> Cadastre-se com Email
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row m-t-20" v-if="interactions.showEmailLogin">
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Nome</label>
                            <input class="form-control" v-model="guest.name">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Sobrenome</label>
                            <input class="form-control" v-model="guest.last_name">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Email</label>
                            <input class="form-control" v-model="guest.email">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Telefone</label>
                            <input class="form-control" v-model="guest.phone">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Senha</label>
                            <input class="form-control" type="password" v-model="guest.password">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Confirmar senha</label>
                            <input class="form-control" type="password" v-model="guest.password_confirmation">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <label>Foto</label>
                            <input class="form-control" type="file" v-on:change="loadPhoto">
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <button class="btn btn-xl btn-primary" @click.prevent="signup()">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import eventObj from '@/models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'signup',
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
