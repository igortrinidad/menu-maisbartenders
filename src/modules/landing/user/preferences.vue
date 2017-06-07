<template>
   <div class="page">

        <div>
            <div class="container m-t-30 text-center">
                <h2>Meus drinks</h2>
                <span class="sub-header">Suas criações e os drinks que você salvou.</span>
            </div>
            <div class="col-md-12 col-xs-12">
                <router-link class="btn btn-primary pull-right" :to="{name: 'landing.drinks.createdrink'}">
                    Crie seu drink
                </router-link>
            </div>
        </div>

                <h5  class="text-muted" v-if="!currentUser.saved_drinks.length">Você não possui nenhum drink salvo</h5>
                <div class="cols">
                    <div v-for="(drink, index) in currentUser.saved_drinks" class="col">
                        <div tag="div" class="drink" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                            <div class="badges" data-toggle="modal" data-target="#badge-help">
                            <span class="badge" v-if="drink.is_exclusive">
                                <img src="../../../assets/images/king.png" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                            </span>
                                <span class="badge" v-if="drink.priority >= 4">
                                <img class="zoom" src="../../../assets/images/star.png" alt="Este drink está entre os BEST SELLERS"
                                    title="Este drink está entre os BEST SELLERS">
                            </span>
                            </div>

                            <router-link tag="span" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                    <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                                    <div class="details">
                                        <h3 class="drink-name">{{ drink.name }}</h3>
                                        <!-- <i class="stars fa fa-star" v-for="n in drink.priority"></i> -->
                                        <span class="description">{{ drink.description }}</span>

                                        <hr>
                                    </div>
                                </router-link>
                                <h5 class="cursor-pointer" @click="drinkToShowToggle(drink)">Ingredientes 
                                    <i class="fa pull-right" :class="{'fa-plus' : interactions.drinksToShowInfo.indexOf(drink) < 0, 'fa-minus' : interactions.drinksToShowInfo.indexOf(drink) > -1}" ></i>
                                </h5>
                                <div class="items" v-show="interactions.drinksToShowInfo.indexOf(drink) >-1">
                                    <span class="drink-item" v-for="(item, index) in drink.items">{{ item.name }}</span>
                                </div>

                            <button class="btn btn-danger btn-sm m-b-10 btn-drink-action btn-share m-t-5"
                                    @click="removeDrinkPreference(drink)">Excluir drink
                            </button>
                        </div>

                    </div>
                </div>
                <div class="modal fade" id="badge-help" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Ícones nos drinks</h4>
                            </div>
                            <div class="modal-body p-25 text-center">

                                <div class="row">
                                    <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/king.png" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                        <p>
                                            Os drinks que estão marcados com este ícone são drink exclusivos Mais Bartenders, criados e desenvolvidos por nossa equipe.</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/star.png" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               </span>

                                        <p>Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos eventos.</p>
                                    </div>
                                </div>

                                <br>

                            </div>
                            <div class="modal-footer">
                                <button type="button" data-dismiss="modal" class="btn btn-primary">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import userObj from '../../../models/User.js'

    var Swiper = require('swiper')

    export default {
        name: 'user-preferences',
        data () {
            return {
                interactions: {
                    drinksToShowInfo: [],
                },
                exclusiveBadge: '../../../../static/assets/king.png',
                starBadge: '../../../../static/assets/star.png',
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            var that = this
        },
        methods: {

            ...mapActions(['setLoading', 'removeDrinkFromSavedDrinks']),

            drinkToShowToggle: function(drink){
                let that = this
                var index = that.interactions.drinksToShowInfo.indexOf(drink);
                if(index > -1){
                    that.interactions.drinksToShowInfo.splice(index,1)
                } else {
                    that.interactions.drinksToShowInfo.push(drink)
                }
            },

            removeDrinkPreference: function (drink) {
                let that = this

                var data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                this.$swal({
                    title: 'Confirmar exclusão?',
                    text: 'Tem certeza que deseja excluir este drink?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não'
                }).then(function () {

                    that.$http.post('/guest/removeDrinkPreference', data)
                        .then(function (response) {


                           that.removeDrinkFromSavedDrinks(drink)


                            successNotify('', 'Drink excluído com sucesso!')
                        })
                        .catch(function (error) {
                            console.log(error)
                            errorNotify('Ops!', 'Ocorreu um erro ao deletar seu drink!')
                        });

                }, function (cancel) {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                })

            },
        }
    }
</script>

<style scoped>

    a.interactions {
        color: #2C3E50;
    }

    .text-selected {
        background-color: #FED136;
        font-size: 22px;
    }

    #contact {
        background-color: #F7F7F7;
    }

    #drinks {
        background-color: rgba(44, 60, 80, .07);
        padding: 80px 0;
    }

    .cols {
        width: 100%;
        column-count: 3;
        column-gap: 0;

    }

    .col {
        width: 100%;
        display: inline-block;
        padding: 5px;
    }

    .cols.align-block {
        display: flex;
    }

    .cols.align-block .col {
        width: 33.3333%;
    }

    @media (max-width: 768px) {
        .cols {
            column-count: 2;
        }

        .cols.align-block .col {
            width: 50%;
        }
    }

    @media (max-width: 414px) {
        .cols {
            column-count: 1;
        }

        .cols.align-block {
            display: grid;
        }

        .cols.align-block .col {
            width: 100%;
        }
    }

    /* Drinks & Drink Card */
    .list-drinks {
        margin: 40px 0;
    }

    .drink {
        padding: 20px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
        position: relative;
    }

    .drink img {
        max-width: 100%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .badges + span {
        cursor: pointer;
    }

    .drink .description {
        display: block;
        max-width: 100%;
    }

    .drink-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .drink .stars {
        margin-right: 3px;
    }

    /* Badge */
    .badges {
        display: flex;
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
    }

    .badge {
        width: 45px;
        height: 45px;
        border: 2px solid #fed136;
        display: flex;
        padding: 10px;
        background: rgba(44, 62, 80, .8);
        margin: 5px;
        border-radius: 50%;
    }

    .modal-badge.badge {
        margin: 20px auto;
    }

    .badge:hover {
        transform: scale(1.05);
    }

    .badge:active {
        transform: scale(1.00);
    }

    .badge img {
        max-width: 100%;
    }

    .badge img.zoom {
        transform: scale(1.1);
    }

    .btn-share {
        margin-top: 5px;
        font-size: 11px;
        font-weight: 100;
        letter-spacing: 1px;
        padding: 2px 8px 2px 8px;
    }


</style>
