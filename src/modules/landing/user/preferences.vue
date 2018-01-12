<template>
    <div class="first-container">

        <main-header :title="translations.title" />

        <!-- User Pic + Title -->
        <div class="container">

            <div class="pic large center" :style="`background-image: url(${ currentUser.photo_url })`" v-show="currentUser.photo_url"></div>
            <div class="pic large center non-pic" v-show="!currentUser.photo_url">{{ getInitialChar(currentUser) }}</div>

            <h4 class="title-section">{{translations.section_title}}</h4>

            <router-link tag="button" :to="{ name: 'landing.drinks.createdrink' }" class="btn btn-block btn-mb-primary" v-if="isLogged">
                {{translations.buttons.create}}
            </router-link>
        </div>

        <div class="container-colored m-t-30">
            <div class="container">

                <!-- User Has No Drinks -->
                <div class="card text-center">
                    <div class="card-body card-padding">
                        <h5 class="card-title">{{translations.no_drinks}}</h5>
                        <router-link class="btn btn-mb-primary outline" :to="{ name: 'landing.drinks.list' }">
                            {{translations.buttons.go_to_menu}}
                        </router-link>
                    </div>
                </div>

                <div class="cols">
                    <div v-for="(drink, index) in currentUser.saved_drinks" class="col">

                        <!-- Start Drink -->
                        <div class="card m-0">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ drink.photo_url })` }">
                            </div>

                            <!-- Card Body -->
                            <div class="card-body card-padding text-center">
                                <router-link tag="div" :to="{ name: 'landing.drinks.show', params: { drink_slug: drink.url} }">
                                    <h3 class="title-section t-overflow m-b-10">{{ drink.name }}</h3>
                                    <p class="description m-0" style="color: #222">{{ drink.description }}</p>
                                </router-link>

                                <span
                                    class="btn btn-xs btn-mb-primary outline m-t-20"
                                    style="margin-bottom: 50px;"
                                    @click="drinkModal(drink)"
                                    v-if="isLogged"
                                >
                                    {{ translations.buttons.details }}
                                </span>

                                <button
                                    class="btn btn-mb-danger btn-fixed-bottom"
                                    style="box-shadow: none"
                                    @click="removeDrinkPreference(drink)"
                                    >{{ translations.buttons.remove }}
                                </button>


                            </div>
                        </div>
                        <!-- End Drink -->

                    </div>
                </div>

            </div>
        </div>

        <!--Modal Current Drink -->
        <div class="modal" id="modal-drink" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="title-section m-0" style="font-size: 30px;">{{ currentDrink.name }}</h4>
                    </div>

                    <div class="modal-body ext">

                        <!-- Badges -->
                        <div class="badges">
                           <span class="badge" v-if="currentDrink.is_exclusive">
                               <img src="../../../assets/images/king.svg" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               {{ translations.badges.exclusive_drinks_title }}
                           </span>
                            <span class="badge" v-if="currentDrink.priority >= 4">
                               <img src="../../../assets/images/star.svg" alt="Este drink está entre os BEST SELLERS" title="Este drink está entre os BEST SELLERS">
                               {{ translations.badges.best_sellers_title }}
                           </span>
                        </div>

                        <!-- Ingredients -->
                        <div class="card">
                            <div class="card-body card-padding">
                                <h4 class="title-section m-0">Ingredientes</h4>
                                <ul class="list-group m-t-30 m-b-0">
                                    <li class="list-group-item" v-for="(item, index) in currentDrink.items">
                                        <span v-show="item.pivot.is_visible" style="color: #000;">
                                            {{ item[`name_pt`] ? item[`name_pt`] : item['name_pt'] }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-block btn-mb-default"
                            data-dismiss="modal"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Current Drink -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import * as translations from '@/translations/user/preferences'

    import userObj from '../../../models/User.js'

    var Swiper = require('swiper')

    export default {
        name: 'user-preferences',
        components: {
            mainHeader
        },
        data () {
            return {
                interactions: {
                    drinksToShowInfo: [],
                },
                exclusiveBadge: '../../../../static/assets/king.png',
                starBadge: '../../../../static/assets/star.png',
                currentDrink: []
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'language']),
            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }

        },
        mounted(){
            var that = this
        },
        methods: {

            ...mapActions(['setLoading', 'removeDrinkFromSavedDrinks']),

            drinkModal: function(items) {
                this.currentDrink = items
                $('#modal-drink').modal('show')
            },

            getInitialChar(user) {
                return `${ user.full_name.charAt(0) } ${ user.last_name.charAt(0) }`
            },

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

    .btn.btn-fixed-bottom {
        border-radius: 0 0 10px 10px;
    }

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

    .btn-share {
        margin-top: 5px;
        font-size: 11px;
        font-weight: 100;
        letter-spacing: 1px;
        padding: 2px 8px 2px 8px;
    }


</style>
