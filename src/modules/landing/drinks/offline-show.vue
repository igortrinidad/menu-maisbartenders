<template>
    <div class="first-container show">

        <main-header :title="drinkFound ? drink.name : translations.drink_not_found_title"/>

        <div v-if="drinkFound" id="drink-show-offline">
            <div class="show-header" v-bind:style="{ backgroundImage: drinkBackground}">

                <span>
                    <a href="#drink" v-scroll-to="'#drink'">{{translations.buttons.details}}</a>
                </span>

            </div>

            <!-- RETIRAR OS BADGES
            <div class="container m-t-30">
                <div class="badges">
                    <div class="badge-container" v-if="drink.is_exclusive">
                    <span class="badge">
                        <img src="../../../assets/images/king.svg" :alt="translations.exclusive_drink"
                             :title="translations.exclusive_drink">
                        <span class="text-uppercase">{{translations.exclusive_drink}}</span>
                    </span>
                    </div>
                    <div class="badge-container" v-if="drink.priority >= 4">
                    <span class="badge">
                        <img class="zoom" src="../../../assets/images/star.svg" :alt="translations.best_sellers"
                             :title="translations.best_sellers">
                        <span class="text-uppercase">{{translations.best_sellers}}</span>
                    </span>
                    </div>
                </div>
            </div>
            -->

            <div id="drink" class="container-colored m-t-30">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">

                            <h4 class="title-in-colored m-0">{{ drink.description }}</h4>

                            <div class="card m-t-30">
                                <div class="card-body card-padding">
                                    <h4 class="m-0">{{translations.ingredients}}</h4>
                                    <div v-if="isLogged">

                                        <ul class="list-group m-t-30 m-b-0">
                                            <li class="list-group-item" v-for="item in drink.items" v-if="item.pivot.is_visible">
                                                <span v-show="item.pivot.is_visible" style="color: #000;">
                                                    {{ item[`name_${language}`] ? item[`name_${language}`] : item['name_pt'] }}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="!isLogged">
                                        <router-link tag="button" class="btn btn-mb-primary outline m-t-20" :to="{ name: 'landing.auth.login', query: {redirect: $route.path} }">
                                            {{translations.unauthenticated}}
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-30">{{translations.flavor_map}}</h4>
                                            <canvas ref="createdDrinkChart"></canvas>
                                        </div>
                                    </div>
                                </div>

                                <!--
                                <div class="col-md-6 col-xs-12">
                                    <h4 class="m-b-30">Informação nutricional</h4>
                                    <div class="row text-left">
                                        <div class="col-md-8 col-md-offset-2 col-xs-12">
                                        <span class="text-left">
                                            <small class="f-16 f-500">Porção: 1 unidade</small>
                                            <table class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th class="text-center">Quantidade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="nutri in nutritional_facts_ordereds">
                                                        <td>{{nutri.name}}</td>
                                                        <td class="text-center">{{nutri.quantity | formatNumber}} {{nutri.unity}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <p class="nutrition-disclaimer">*Os valores nutricionais podem alterar levemente devido à maturação das frutas e quantidade utilizada de cada ingrediente no preparo.</p>
                                            <p class="nutrition-disclaimer">Fonte: <a target="_blank"
                                                                                      href="http://www.tabelanutricional.com.br/">tabelanutricional.com.br</a></p>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                -->


                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="" v-if="!drinkFound">
            <header class="header-greeting"
                    v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container">
                    <div class="intro-text">
                        <div class="intro-heading">:(</div>
                        <div class="intro-heading">{{translations.drink_not_found_message}}</div>
                        <button class="btn btn-primary" @click="backPage()">{{translations.buttons.back}}</button>
                    </div>
                </div>
            </header>
        </div>



        <button class="btn btn-fixed-bottom btn-mb-info" style="position: fixed" @click="backPage()"><i class="fa fa-chevron-left"></i>
            {{translations.buttons.back}}
            ({{interactions.idleTime}}<span style="text-transform: lowercase;">s</span>)
        </button>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import drinkObj from '../../../models/Drink.js'
    import mainHeader from '@/components/main-header.vue'
    import * as translations from '@/translations/drinks/show'

    export default {
        name: 'show-drink',
        components: {
            pagination: require('@/components/pagination.vue'),
            mainHeader
        },
        data() {
            return {
                interactions: {
                    phraseSelected: '',
                    idleTime: 60,
                    interval: null,
                },
                drinkFound: true,
                drink: drinkObj,
                comments: [],
                pagination: {},
                displayDrinks: false,
                nutritional_facts: [],
                alcoholStyles: [
                    {label: 'Sem álcool', value: 0},
                    {label: 'Leve', value: 2.5},
                    {label: 'Equilibrado', value: 5.0},
                    {label: 'Forte', value: 7.5},
                    {label: 'Super forte', value: 10},
                ]
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes', 'language']),
            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },
            drinkBackground: function () {
                return `url('${ cordova.file.dataDirectory }/drink-${ this.drink.url }.${ this.drink.typeImg }')`
            },

            phrases: function () {
                let that = this

                var phrases = [];

                var phrase1 = `Keep calm e toma um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Quero muito um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Eu preciso de um drink ${that.drink.name} agora!`;
                phrases.push(phrase1);

                var phrase1 = `Tudo que eu preciso é sombra e um ${that.drink.name}.`;
                phrases.push(phrase1);

                return phrases

            },

            nutritional_facts_ordereds: function () {
                let that = this
                return _.orderBy(this.nutritional_facts, 'id', 'asc');
            },

        },
        watch: {
            language(val, oldVal) {
                this.drawChart()
            }
        },
        mounted() {
            this.getDrink();
            this.checkIdleTime();
        },
        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'addUserDrinkLike', 'removeUserDrinkLike']),

            backPage: function () {
                var that = this;
                clearInterval(that.interactions.interval);
                this.interactions.idleTime = 60;
                window.history.back();
            },

            checkIdleTime: function () {
                let that = this

                that.interactions.interval = setInterval(that.timerIncrement, 1000);
                //Zero the idle timer on mouse movement.
                $(window).scroll(function (e) {
                    if (that.$route.name == 'landing.drinks.show-offline') {
                        that.interactions.idleTime = 60;
                    }
                });


            },

            timerIncrement: function () {
                let that = this

                that.interactions.idleTime--;
                if (that.interactions.idleTime <= 0 && that.$route.name == 'landing.drinks.show-offline') { // 2 minutes
                    clearInterval(that.interactions.interval);
                    window.history.back()
                }

            },

            checkDrinkNutrition: function () {
                let that = this

                that.nutritional_facts = [];

                that.drink.items.forEach(function (item) {
                    item.nutrients.forEach(function (nutri) {

                        nutri.quantity = parseFloat(item.pivot.quantity) / 100 * parseFloat(nutri.pivot.quantity);


                        var hasNutri = that.nutritional_facts.findFromAttr('name', nutri.name)

                        if (hasNutri) {
                            var index = that.nutritional_facts.indexFromAttr('name', nutri.name)
                            that.nutritional_facts[index].quantity = parseFloat(that.nutritional_facts[index].quantity) + parseFloat(nutri.quantity);

                        } else {
                            that.nutritional_facts.push(nutri)
                        }


                    })
                })

            },

            drawChart: function () {

                var alcohol = this.alcoholStyles.findFromAttr('label', this.drink.style);

                const keys = this.translations.map_labels;

                const values = [this.drink.sour, this.drink.sweet, this.drink.bitter, this.drink.dry, this.drink.salt, alcohol.value];

                if (this.chart) this.chart.destroy()
                this.chart = new Chart(this.$refs.createdDrinkChart, {
                    type: 'radar',
                    pointLabelFontSize: 20,
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                label: this.drink.name,
                                backgroundColor: "RGBA(254, 209, 54, 0.3)",
                                borderColor: "RGBA(254, 209, 54, 1.00)",
                                data: values,
                                pointRadius: 4,
                                pointDot: false,
                                fontSize: 20,
                                defaultFontSize: 30
                            },
                        ]
                    },
                    options: {
                        pointDot: false,
                        showTooltips: false,
                        scaleOverride: true,
                        scaleSteps: 2,
                        scaleStepWidth: 2,
                        scaleBeginAtZero: true,
                        scale: {
                            ticks: {
                                min: 0,
                                max: 10,
                                beginAtZero: 0,
                            },
                            pointLabels: {
                                fontSize: 16,
                                fontColor: '#2c3e50'
                            }
                        }
                    },
                })
            },


            getDrink: function () {
                let that = this

                that.drink = JSON.parse(localStorage.getItem('drink'));
                //that.checkDrinkNutrition();

                that.drawChart();
                that.countDrinkOpenned();

            },

            countDrinkOpenned: function () {
                let that = this
                let drinks = JSON.parse(localStorage.getItem('drinksWithOpenedTimes'))

                let countDrinks = []

                if (drinks) {
                    const index = _.findIndex(drinks, {'url': that.drink.url})
                    if (index < 0) {
                        that.drink.opened_times = 0
                        drinks.push(that.drink)
                    }
                    drinks.forEach((drink) => {
                        if (drink.url === that.drink.url) {
                            drink.opened_times++
                        }
                    })

                    localStorage.removeItem('drinksWithOpenedTimes')
                    localStorage.setItem('drinksWithOpenedTimes', JSON.stringify(drinks))

                } else {
                    drinks = []
                    that.drink.opened_times = 1
                    drinks.push(that.drink)
                    localStorage.setItem('drinksWithOpenedTimes', JSON.stringify(drinks))
                }
            },

            handleGuestAvatar(guest) {

                let guest_avatar = null

                if (guest.photo_url) {
                    guest_avatar = guest.photo_url
                }

                if (guest.social_providers.length) {
                    guest_avatar = guest.social_providers.find(provider => provider.provider === 'facebook').photo_url
                }

                return guest_avatar ? guest_avatar : '/static/assets/user_avatar.jpg'
            },

        }
    }
</script>

<style scoped>
    .nutrition-disclaimer {
        font-size: 12px;
    }

    /* Badge */
    .badges {
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
    }

    .badge-container {
        width: 200px;
        position: relative;
        padding: 0 20px 20px 20px;
    }

    .badge:hover {
        transform: none
    }

    .badge {
        margin: 0 auto;
    }

    .badge span {
        display: block;
        width: 100%;
        color: rgba(44, 62, 80, 1);
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        text-transform: uppercase;
    }

    .container-fluid {
        margin-top: 10px;
    }

    section h2.section-heading {
        margin-top: 0px;
    }

    /* Like button */
    .btn-like {
        background-color: transparent;
    }

    .btn-like:hover {
        color: #e74c3c;
    }

</style>

<style>
    /*
    @TODO mover esses styles para o arquivo principal
     */

    /*
    * Paginação
     */
    .pagination > li > a,
    .pagination > li > span {
        color: #2c3e50;
        background-color: #fed136;
    }

    .pagination > li:first-child > a,
    .pagination > li:first-child > span {
        margin-left: 0;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }

    .pagination > li:last-child > a,
    .pagination > li:last-child > span {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }

    .pagination > li > a:hover,
    .pagination > li > span:hover,
    .pagination > li > a:focus,
    .pagination > li > span:focus {
        color: #fff;
        background-color: #fec503;
    }

    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
        color: #fff;
        background-color: #fec503;
    }

    .pagination > .disabled > span,
    .pagination > .disabled > span:hover,
    .pagination > .disabled > span:focus,
    .pagination > .disabled > a,
    .pagination > .disabled > a:hover,
    .pagination > .disabled > a:focus {
        color: #3d5870;
        background-color: #FEE89A;
    }

    /*
    Comentarios
     */
    .media-list {
        padding-left: 0;
        list-style: none;
    }

    .media-object {
        display: block;
    }

    .media, .media-body {
        overflow: hidden;
        zoom: 1;
    }

    .media-heading {
        margin: 0 0 5px;
    }


</style>
