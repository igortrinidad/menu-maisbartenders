<template>
   <div>

    <section id="login">
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
                        <button class="btn btn-info btn-block facebook" @click="socialLogin('facebook')">
                            <i class="fa fa-facebook fa-lg button-icon"></i> Login com Facebook
                        </button>
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-info btn-block google" @click="socialLogin('google')">
                            <i class="fa fa-google fa-lg button-icon"></i> Login com Google
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

            <div class="row m-t-20" v-if="interactions.showEmailLogin">

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control">
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <label>Senha</label>
                        <input class="form-control">
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-xl btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventObj from '../../../models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'login',
        data () {
            return {
                interactions: {
                    showEmailLogin: false,
                }
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){

        },
        methods: {
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
</style>
