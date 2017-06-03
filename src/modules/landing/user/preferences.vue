<template>
   <div>

    <section id="user-drinks">
        <div class="container">
            <div class="row m-t-30 m-b-20">
                <div class="col-md-6 col-xs-12">
                    <h3 class="section-heading">Minhas criações</h3>
                </div>
                <div class="col-md-6 col-xs-12">
                    <router-link class="btn btn-primary pull-right" :to="{name: 'landing.user.createdrink'}">
                            Crie seu drink
                        </router-link>
                    
                </div>
            </div>

        <hr>
  

            <div class="row m-t-20">

                <div class="col-md-6 col-xs-12" v-for="(drink, index) in user.preferences">
                    <div class="text-right">
                        <button class="btn btn-danger btn-sm m-b-10 btn-drink-action" @click="removeDrinkPreference(drink)">Excluir este drink</button>
                    </div>
                    <router-link class="interactions m-b-10" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                            <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
                            <h3>{{drink.name}}</h3>
                            <br>
                            <small>Criado em: {{drink.created_at}}</small>
                    </router-link>
                </div>
            </div>
        </div>
    </section>

    <section id="user-preferences">
        <div class="container">
            <div class="row m-b-30">
                <div class="col-lg-12">
                    <h3 class="section-heading">Drinks salvos</h3>
                </div>
            </div>

            <div class="row m-t-20">

                <div class="col-md-6 col-xs-12" v-for="(drink, index) in user.preferences">
                    <div class="text-right">
                        <button class="btn btn-danger btn-sm m-b-10 btn-drink-action" @click="removeDrinkPreference(drink)">Excluir este drink</button>
                    </div>
                    <router-link class="interactions m-b-10" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                            <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
                            <h3>{{drink.name}}</h3>
                            <br>
                            <small>Criado em: {{drink.created_at}}</small>
                    </router-link>
                </div>
            </div>
        </div>
    </section>

   </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import userObj from '../../../models/User.js'

    var Swiper = require('swiper')

    export default {
        name: 'user-preferences',
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
            this.fetchDrinkPreference();
        },
        methods: {

            ...mapActions(['setLoading']),

            fetchDrinkPreference: function(){
                let that = this

                that.setLoading({is_loading: true, message: 'Carregando seus drinks'})

                that.$http.post('/guest/fetchDrinkPreference', { guest_id: that.currentUser.id })
                    .then(function (response) {

                        that.setLoading({is_loading: false, message: ''})

                        successNotify('', 'Drink salvo com sucesso!')

                    })
                    .catch(function (error) {
                        console.log(error)
                        errorNotify('Ops!', 'Ocorreu um erro ao buscar preferências.')
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            removeDrinkPreference: function(drink){
                let that = this

                var data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                this.$swal({
                    title: "Confirmar exclusão",
                    text: "Tem certeza que deseja excluir este drink?",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Não",
                    confirmButtonText: "Sim, tenho certeza.",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {

                        that.$http.post('/guest/removeDrinkPreference', data)
                        .then(function (response) {

                            successNotify('', 'Drink salvo com sucesso!')

                        })
                        .catch(function (error) {
                            console.log(error)
                            errorNotify('Ops!', 'Ocorreu um erro ao remover drink!')
                        });
                    }
                })

            },
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
