<template>
   <div>

    <section id="login">
        <div class="container">
            <div class="row m-b-30">
                <div class="col-lg-12">
                    <h2 class="section-heading">Preferências</h2>
                    <h4 class="text-muted m-t-30">Veja seus drinks preferidos.</h4>
                </div>
            </div>

            <div class="row m-t-20">

                <div class="col-md-6 col-xs-12" v-for="(drink, index) in user.preferences">
                    <div class="text-right">
                            <button class="btn btn-danger btn-sm m-b-10 btn-drink-action">Excluir preferência</button>
                        </div>
                    <router-link class="interactions m-b-10" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                            <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
                            <h3>{{drink.name}}</h3>
                            <br>
                            <small>Criado em: {{drink.created_at}}</small></p>
                            
                    </router-link>

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

    a.interactions{
        color: #2C3E50;
    }
    .text-selected{
        background-color: #FED136;
        font-size: 22px;
    }

    #contact{
        background-color: #F7F7F7;
    }

</style>
