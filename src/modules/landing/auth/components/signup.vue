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
                            <button class="btn btn-info btn-block facebook" @click="socialLogin('facebook')">
                                <i class="fa fa-facebook fa-lg button-icon"></i> Cadastre-se com Facebook
                            </button>
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="form-group">
                            <button class="btn btn-info btn-block google" @click="socialLogin('google')">
                                <i class="fa fa-google fa-lg button-icon"></i> Cadastre-se com Google
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
    import {mapGetters} from 'vuex'
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

        },
        methods: {
            signup() {
                let that = this
                let formData = new FormData();

                Object.keys(that.guest).map(function (key, index) {
                    formData.append(key, that.guest[key])
                });

                 that.$http.post('/guest/create', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                 .then(function (response) {
                 successNotify('', 'Cadastro realizado com sucesso.')

                     that.$router.push({path: '/login'})

                 })
                 .catch(function (error) {
                    errorNotify('', 'Houve um erro ao realizar o cadastro.')
                 });
            },

            loadPhoto(event){
                this.guest.photo = event.target.files[0]
            },

            socialLogin(type) {
                localStorage.setItem('role', 'guest')
                this.$auth.oauth2({
                    provider: type
                });
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
