<template>
   <div>

    <section id="login">
        <div class="container">
            <div class="row m-b-30">
                <div class="col-lg-12">
                    <h2 class="section-heading">Cadastro</h2>
                    <h4 class="text-muted m-t-30">Veja seu cadastro no Menu Interativo.</h4>
                </div>
            </div>

            <div class="row m-t-20">
                <div class="col-md-5 col-xs-12">
                    <h3>Dados do cadastro</h3>
                    <div class="form-group">
                        <label>Primeiro nome</label>
                        <input class="form-control" v-model="user.first_name">
                    </div>
                    <div class="form-group">
                        <label>Segundo nome</label>
                        <input class="form-control" v-model="user.last_name">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" v-model="user.email">
                    </div>
                    <div class="form-group">
                        <label>Telefone</label>
                        <input class="form-control" v-model="user.phone">
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input class="form-control" v-model="user.password">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-xl btn-primary">Salvar</button>
                    </div>
                </div>

                <div class="col-md-6 col-md-offset-1 col-xs-12">
                    <h3>Ultimas interações</h3>

                    <h5>Eventos</h5>
                    <span v-for="(event, index) in user.events">
                        <small>Data: {{event.date}}</small>
                        <p class="interactions">{{event.name}}</p>
                    </span>
                    
                    <hr>
                    <h5>Preferências</h5>

                    <span v-for="(preference, index) in user.preferences">
                        <small>Criado em: {{preference.created_at}}</small>
                        
                        <div class="row">
                            <div class="col-md-10 col-xs-10">
                                <p class="interactions">{{preference.name}}</p>
                            </div>
                            <div class="col-md-2 col-xs-2">
                                <button class="btn btn-danger btn-sm">X</button>
                            </div>
                            
                        </div>
                    </span>
                    
                    <hr>

                    <h5>Comentários</h5>

                    <span v-for="(comment, index) in user.comments">
                        <small>Criado em: {{comment.created_at}}</small>
                        <p class="interactions">{{comment.phrase}}</p>
                    </span>
                </div>
            </div>
        </div>
    </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import userObj from '../../../models/User.js'

    var Swiper = require('swiper')

    export default {
        name: 'show-user',
        data () {
            return {
                interactions: {

                },
                user: userObj
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

    .interactions{
        display: block;
        border-radius: 4px;
        background-color: #E5E5E5;
        padding: 5px 10px 5px 10px;
        font-size: 17px;
        font-weight: 500;
    }
</style>
