<template>
    <div class="first-container show" :class="{ 'm-b-30': currentCategory }" ref="container">

        <main-header :title="!eventFound ? translations.title: event.name"/>

        <!-- EventFound -->
        <div v-if="eventFound">
            <div class="show-header" v-bind:style="{ backgroundImage: eventBackground}">

                <span class="t-overflow" v-if="eventHasHappened">
                    {{ eventHasHappened ? 'Esse evento já passou' : event.hashtag }}
                </span>

            </div>

            <!-- Container Colored -->
            <div class="container-colored" style="margin-top: -20px">
                <div class="container">

                    <!-- Event Greeting & Share On Whatsapp -->
                    <div class="card m-b-10 text-center">
                        <div class="card-body card-padding">
                            <div v-html="event.greeting">
                            </div>

                            <button class="btn btn-block btn-mb-whatsapp m-t-20" data-toggle="modal"
                                    data-target="#modalShareWhatsApp">
                                {{translations.buttons.whatsapp}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <span id="categories"></span>
            <span id="drinks"></span>
            <section v-show="!interactions.finished_loading_category && !interactions.is_loading">
                <!-- CATEGORIES -->

                <h4 class="title-section">{{translations.labels.categories}}</h4>

                <div class="container"
                     :class="{'cat-is-selected' : currentCategory}">

                    <p class="text-center section-subheading text-muted">{{translations.categories_message}}</p>

                    <div class="categories">
                        <!-- ALL -->
                        <div class="category">
                            <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                                 @click="selectCategory(categoryAll)">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" src="../../../assets/images/todos_drinks.svg" alt="">
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">{{categoryAll[`name_${language}`]}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /ALL -->
                        <!--Fetched categories-->
                        <div class="category" v-for="(category) in event.drink_categories">
                            <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                                 @click="selectCategory(category)">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" :src="category.photo_url" alt="">
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">{{category[`name_${language}`]}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /Fetched categories-->
                    </div>
                </div>
                <!-- /CATEGORIES -->

            </section>

            <section v-show="interactions.finished_loading_category">
                <div class="text-center" v-if="interactions.finished_loading_category">
                    <h3>{{translations.labels.drinks}}</h3>
                    <p class="text-center section-subheading text-muted">{{translations.category_selected}}</p>
                    <div class="card-body card-padding m-b-20">
                        <img class="cat-icon" :src="currentCategory.photo_url" alt="">
                        <div class="m-t-5">
                            <h6 class="card-title m-b-0">{{currentCategory[`name_${language}`]}}</h6>
                        </div>
                    </div>

                    <button type="button" class="btn btn-mb-primary "
                            @click.prevent="resetCategory()"
                    >
                        {{translations.buttons.change_category}}
                    </button>
                </div>


                <div class="container-colored list-drinks p-t-30">
                    <div class="container">
                        <div class="cols" :class="{ 'align-block': drinksFiltered.length === 2 }">
                            <div v-for="(drink, index) in drinksFiltered" class="col">

                                <!-- Start Drink -->
                                <div class="card m-0">
                                    <!-- Card Header -->
                                    <router-link tag="div"
                                                 :to="{ name: 'landing.drinks.show', params: { drink_slug: drink.url} }"
                                                 class="card-header cover cursor-pointer"
                                                 :style="{ backgroundImage: `url(${ drink.photo_url })` }">
                                    </router-link>

                                    <!-- Card Body -->
                                    <div class="card-body card-padding text-center">
                                        <div class="badges">
                                           <span class="badge" v-if="drink.is_exclusive" data-toggle="modal"
                                                 data-target="#badge-help">
                                               <img src="../../../assets/images/king.svg" :alt="translations.badges.exclusive_drinks_title"
                                                    :title="translations.badges.exclusive_drinks_title">
                                           </span>
                                            <span class="badge" v-if="drink.priority >= 4" data-toggle="modal"
                                                  data-target="#badge-help">
                                               <img class="zoom" src="../../../assets/images/star.svg"
                                                    :alt="translations.badges.best_sellers_title"
                                                    :title="translations.badges.best_sellers_title">
                                           </span>
                                        </div>
                                        <router-link tag="div"
                                                     :to="{ name: 'landing.drinks.show', params: { drink_slug: drink.url} }">
                                            <h3 class="card-title t-overflow">{{ drink.name }}</h3>
                                            <p class="description m-0">{{ drink.description }}</p>
                                        </router-link>

                                        <button
                                            type="button"
                                            class="btn btn-xs btn-mb-primary outline m-t-15"
                                            @click="itemsModal(drink.items)"
                                            v-if="isLogged && drink.items.length"
                                        >
                                            {{translations.buttons.ingredients}}
                                        </button>

                                        <!-- Like -->
                                        <div class="m-t-15 m-b-30" v-if="isLogged">
                                            <!-- Svg -->
                                            <div class="svg-container min"
                                                 :class="{ 'bounce' : handleLikedDrinks(drink.id) }">
                                                <svg viewBox="0 0 30 30">
                                                    <defs>
                                                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stop-color="#FB923B"/>
                                                            <stop offset="100%" stop-color="#F66439"/>
                                                        </linearGradient>
                                                    </defs>
                                                    <g transform="translate(-8.9261333,-9.447)">
                                                        <path
                                                            @click.prevent="likeDrink(drink)"
                                                            class="animated"
                                                            stroke="url(#linear)"
                                                            :fill="`${ handleLikedDrinks(drink.id) ? 'url(#linear)' : 'transparent' }`"
                                                            d="M 24,38.052 23.497,37.756 C 23.19,37.575 15.924,33.25 11.778,26.697 9.575,23.218 8.89,19.544 9.848,16.354 c 0.785,-2.611 2.605,-4.676 5.126,-5.81 0.88,-0.396 1.788,-0.597 2.699,-0.597 2.917,0 5.181,2.028 6.327,3.321 1.147,-1.293 3.41,-3.321 6.328,-3.321 0.911,0 1.819,0.2 2.698,0.597 2.521,1.134 4.342,3.198 5.127,5.81 0.958,3.189 0.272,6.862 -1.93,10.344 -4.146,6.552 -11.412,10.877 -11.719,11.058 z"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                            <span class="text-muted" v-if="drink.likes_count > 0">
                                                {{ drink.likes_count > 1 ? `${ drink.likes_count } ${ translations.likes }` : `1 ${translations.like }` }}
                                            </span>
                                            <span class="text-muted" v-if="drink.likes_count === 0">{{translations.be_first}}</span>
                                        </div>

                                        <!-- Login To Like -->
                                        <div class="m-t-20" v-if="!isLogged">
                                            <router-link class="btn btn-mb-primary" tag="button"
                                                         :to="{ name: 'landing.auth.login' }">
                                                {{translations.buttons.unauthenticated}}
                                            </router-link>
                                        </div>

                                        <!-- Save Drink -->
                                        <button
                                            class="btn btn-mb-info btn-fixed-bottom btn-save"
                                            @click="addDrinkPreference(drink)"
                                            v-if="isLogged && currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        > {{translations.buttons.save_drink}}
                                        </button>

                                        <router-link
                                            tag="button"
                                            class="btn btn-mb-info btn-fixed-bottom btn-save"
                                            :to="{ name: 'landing.user.preferences' }"
                                            v-if="isLogged && currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        > {{translations.buttons.saved_drink}} <i class="fa fa-check"></i>
                                        </router-link>

                                    </div>
                                </div>
                                <!-- End Drink -->

                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <div class="text-center m-t-20 m-b-20" v-if="interactions.finished_loading_category">
                <button type="button" class="btn btn-mb-primary "
                        @click.prevent="resetCategory()"
                >
                    {{translations.buttons.change_category}}
                </button>
            </div>


            <div class="modal fade" id="badge-help" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">{{translations.badges.title}}</h4>
                        </div>
                        <div class="modal-body text-center">

                            <div class="card">
                                <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/king.svg" :alt="translations.badges.exclusive_drinks_title"
                                         :title="translations.badges.exclusive_drinks_title">
                                </span>

                                    <p style="color: #222">{{translations.badges.exclusive_drinks}}</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/star.svg" :alt="translations.badges.best_sellers_title"
                                         :title="translations.badges.best_sellers_title">
                                </span>

                                    <p style="color: #222">{{translations.badges.best_sellers}}</p>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/noiva.svg"
                                         :alt="translations.badges.bride_drinks_title"
                                         :title="translations.badges.bride_drinks_title">
                                </span>

                                    <p style="color: #222">{{translations.badges.bride_drinks}}</p>
                                </div>
                            </div>


                            <div class="card m-b-0">
                                <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/preferido_do_noivo.svg"
                                         :alt="translations.badges.gromm_drinks_title"
                                         :title="translations.badges.gromm_drinks_title">
                                </span>

                                    <p style="color: #222">{{translations.badges.groom_drinks}}</p>
                                </div>
                            </div>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-mb-primary">{{translations.buttons.close}}</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container-colored m-t-30 p-t-30">
                <div class="container">
                    <div class="card m-b-0">
                        <div class="card-body card-padding">
                            <div class="row">
                                <div class="col-md-12 col-xs-12">

                                    <div class="text-center">
                                        <h4 class="title-section m-0">{{translations.labels.comments}}</h4>
                                        <p class="sub-header"> {{ pagination.total > 1 ? `${ pagination.total } ${ translations.comments }` : `1 ${translations.comment }` }}</p>


                                        <p class="text-muted m-b-0 m-t-10">
                                            {{translations.comment_message}} {{event.name}}
                                        </p>

                                        <div class="text-center m-20" v-if="isLogged">
                                            <button class="btn btn-mb-primary" data-target="#modal-comment"
                                                    data-toggle="modal"><i class="fa fa-comment"></i>
                                                {{translations.buttons.new_comment}}
                                            </button>
                                        </div>

                                        <div class="text-center m-20" v-if="!isLogged">
                                            <router-link tag="button" class="btn btn-mb-primary"
                                                         :to="{name: 'landing.auth.login', query:{redirect: $route.path}}"
                                            >
                                                {{translations.buttons.comment_unauthenticated}}
                                            </router-link>
                                        </div>
                                    </div>

                                    <span v-for="(comment, index) in comments">
                                        <div class="row">
                                            <span class="interactions m-10">
                                                <div class="row">
                                                    <div class="col-md-1 col-xs-3">
                                                        <img :src="comment.guest.photo_url" class="img-circle"
                                                             width="60px">
                                                    </div>
                                                    <div class="col-md-11 col-xs-9">
                                                        <br>
                                                        <span
                                                            class="comment-user-name">{{comment.guest.full_name}}</span>
                                                    </div>
                                                </div>
                                                <p class="m-t-10">{{comment.comment}}</p>
                                                <span
                                                    class="text-right comment-date">{{translations.created_at}}: {{comment.created_at | moment('DD/MM/YYYY HH:mm:ss')
                                                    }}</span>
                                            </span>
                                        </div>
                                    </span>

                                    <div class="row">
                                        <div class="col-sm-12" v-show="comments.length">
                                            <div class="text-center">
                                                <pagination :source="pagination" @navigate="navigate"
                                                            :range="6"></pagination>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row text-center" v-if="isMobile">
                                <div class="col-md-12 col-xs-12">
                                    <hr>
                                    <button class="btn btn-mb-info" @click="saveEvent()">{{translations.buttons.save_event}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-mb-primary btn-fixed-bottom" style="position: fixed;" @click="resetCategory()"
                    v-if="currentCategory">{{translations.buttons.change_category}}
            </button>

        </div>

        <div v-if="!eventFound">
            <header id="header-drink" class="header-greeting">
                <div class="container">

                    <div class="svg-container">
                        <svg viewBox="0 0 60 60">
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#FB923B"/>
                                    <stop offset="100%" stop-color="#F66439"/>
                                </linearGradient>
                            </defs>
                            <g style="transform: translate(2px, 2px)">
                                <path class="non-fill animated" stroke="url(#linear)"
                                      d="M 49.124566,50.785258 H 7.7292211 c -2.6133405,0 -4.9494455,-1.349848 -6.2538423,-3.613229 -1.30439678,-2.258839 -1.30439678,-4.958535 0.00455,-7.21737 L 22.1776,4.1086916 c 1.29985,-2.2588437 3.640493,-3.60869161 6.249291,-3.60869161 2.608798,0 4.949446,1.34984791 6.253842,3.60868691 L 55.373861,39.954655 c 1.304397,2.263381 1.304397,4.963077 0,7.221916 -1.304397,2.258839 -3.640497,3.608687 -6.249295,3.608687 z M 28.426891,5.1540222 c -0.445404,0 -1.554369,0.1227126 -2.21793,1.2816758 L 5.506744,42.281666 c -0.6681081,1.158958 -0.2227043,2.181573 0,2.567894 0.2227043,0.38633 0.8862655,1.281676 2.2224771,1.281676 H 49.124566 c 1.336212,0 1.99523,-0.895355 2.21793,-1.281676 0.222695,-0.386331 0.67265,-1.408931 0,-2.567894 L 30.649368,6.435698 C 29.981265,5.2767348 28.872295,5.1540222 28.426891,5.1540222 Z"
                                />
                                <path class="non-fill animated" stroke="url(#linear)"
                                      d="m 28.822302,32.987258 c -1.286219,0 -2.327012,-1.040793 -2.327012,-2.327011 V 17.848049 c 0,-1.286218 1.040793,-2.327011 2.327012,-2.327011 1.286218,0 2.327011,1.040793 2.327011,2.327011 v 12.812198 c 0,1.286218 -1.040793,2.327011 -2.327011,2.327011 z"
                                />
                                <circle class="non-fill animated" stroke="url(#linear)"
                                        cx="28.821358"
                                        cy="38.414032"
                                        r="2.7924135"
                                />
                            </g>
                        </svg>
                    </div>

                    <h3 class="section-title">Ops!</h3>
                    <span>{{translations.event_not_found}} :(</span>

                    <router-link
                        :to="{name: 'landing.drinks.list'}"
                        class="btn btn-mb-primary btn-fixed-bottom m-0"
                        style="position: fixed"
                        @click="closeMenu()"
                    >
                        {{translations.buttons.go_to_menu}}
                    </router-link>

                </div>
            </header>
        </div>

        <!-- Modal Share WhatsApp -->
        <div class="modal" id="modalShareWhatsApp" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="title-section m-0 m-b-10">{{translations.modal_whatsapp.title}}</h4>
                        <p class="m-0">{{translations.modal_whatsapp.message}}</p>
                    </div>
                    <div class="modal-body m-t-0">
                        <div
                            class="card"
                            v-for="(phrase, index) in whatsappPhrases"
                            :class="{ 'm-b-0': index ===  whatsappPhrases.length - 1 }"
                            :style="`background-color: ${ interactions.whatsappPhraseSelected === phrase ? '#FB923B' : '#FFF' }`"
                            @click="interactions.whatsappPhraseSelected = phrase"

                        >
                            <div class="card-body card-padding">
                                <p class="m-0"
                                   :style="`color: ${ interactions.whatsappPhraseSelected === phrase ? '#FFF' : '#FB923B' }`">
                                    {{ phrase }}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-block btn-mb-whatsapp"
                                @click="openShareWhatsapp()"
                                :disabled="!interactions.whatsappPhraseSelected">{{translations.modal_whatsapp.button}} <i
                            class="fa fa-whatsapp"></i>
                        </button>

                        <button type="button" class="btn btn-mb-primary m-t-20" data-dismiss="modal">{{translations.modal_whatsapp.close}}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal commentário -->
        <div class="modal fade" id="modal-comment" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close text-primary" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{translations.modal_comment.title}}</h4>
                    </div>
                    <div class="modal-body">

                        <p>
                            {{translations.modal_comment.message}} {{event.name}}</p>
                        <br>
                        <div class="form-group">
                            <label>{{translations.modal_comment.label}}*</label>
                            <textarea class="form-control" v-model="newComment.comment"
                                      :placeholder="translations.modal_comment.placeholder"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-mb-primary m-b-10 btn-block"
                                @click="saveComment()"
                                :disabled="!newComment.comment"> {{translations.modal_comment.button}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal commentário -->
    </div>
</template>

<script>
    import Vue from 'vue'

    Vue.use(require('vue-moment'));
    import {mapGetters, mapActions} from 'vuex'
    import eventObj from '../../../models/Event.js'
    import drinkObj from '../../../models/Drink.js'
    import moment from 'moment'
    import mainHeader from '@/components/main-header.vue'
    import pagination from '@/components/pagination'
    import * as translations from '@/translations/events/show'

    import allDrinks from '../../../assets/images/todos_drinks.svg'

    export default {
        name: 'show-event',
        components: {
            pagination,
            mainHeader
        },
        data() {
            return {
                formatedDay: '',
                formatedMonth: '',
                formatedYear: '',
                interactions: {
                    phraseSelected: '',
                    whatsappPhraseSelected: '',
                    drinkSelected: drinkObj,
                    drinksToShowInfo: [],
                    finished_loading_category: false,
                },
                eventHasHappened: false,
                filterOptions: [],
                eventFound: true,
                event: eventObj,
                itemsSelecteds: [],
                displayDrinks: false,
                comments: [],
                pagination: {},
                remain: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                filterCategory: [],
                currentCategory: null,
                categoryAll: {
                    name_en: 'All drinks',
                    name_pt: 'Todos os drinks',
                    slug_pt: 'todas',
                    slug_en: 'all',
                    photo_url: allDrinks
                },
                newComment: {
                    event_id: '',
                    user_id: '',
                    comment: ''
                },
                isMobile: false
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
            eventBackground: function () {
                return 'url(' + this.event.photo_url + ')';
            },
            itemsCategoriesOrdereds: function () {
                return {
                    fruitsAndIngredients: {
                        label: 'Frutas & Ingredientes',
                        items: this.getItemsByCategory('frutas')
                    },

                    drinks: {
                        label: 'Bedidas',
                        items: this.getItemsByCategory('bebidas')
                    },

                    presentations: {
                        label: 'Apresentação',
                        items: this.getItemsByCategory('Apresentação')
                    },

                    styles: {
                        label: 'Estilo',
                        items: this.getItemsByCategory('estilo')
                    },
                }
            },

            drinksFiltered: function () {
                var that = this
                var arr = this.event.drinks.filter(function (drink) {
                    return that.checkIfDrinkHasCategory(drink)
                })

                return arr;

            },

            whatsappPhrases: function () {
                let that = this

                var phrases = [];

                var phrase1 = `Olá, queria convidar você para conferir o cardápio do(a) ${that.event.name}.`;
                phrases.push(phrase1);

                var phrase1 = `Meu grande dia está chegando, confira aqui o cardápio dos drinks que vão bombar no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Já escolheu os drinks do(a) ${that.event.name}?`;
                phrases.push(phrase1);

                return phrases;
            },

        },
        mounted() {
            var that = this

            if (window.cordova) {
                that.isMobile = true
            }

            this.getEvent();
            this.getEventComments();

        },

        filters: {
            addSpaceOnUrl: function (value) {
                let that = this
                return value;
            },
        },
        methods: {
            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'addUserDrinkLike', 'removeUserDrinkLike', 'setSelectedCategory']),

            getFormatedDates: function () {
                this.formatedDay = moment(this.event.date, 'DD/MM/YYYY').format('DD')
                this.formatedMonth = moment(this.event.date, 'DD/MM/YYYY').locale('pt-BR').format('MMM')
                this.formatedYear = moment(this.event.date, 'DD/MM/YYYY').format('YYYY')
            },

            checkRemainTime: function () {
                let that = this
                var then = that.event.date + ' ' + that.event.time;

                if (moment(then, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
                    that.eventHasHappened = true
                } else {
                    setInterval(function () {
                        var then = that.event.date + that.event.time;
                        var ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment());
                        var d = moment.duration(ms);
                        that.remain.days = d.days();
                        that.remain.hours = d.hours();
                        that.remain.minutes = d.minutes();
                        that.remain.seconds = d.seconds();
                    }, 1000)
                }
            },

            back: function () {
                window.history.back();
            },

            openShareWhatsapp: function () {
                let that = this
                console.log();

                if (that.interactions.whatsappPhraseSelected === '') {
                    errorNotify('', 'Selecione uma frase para compartilhar')
                    return
                }

                var url = `https://api.whatsapp.com/send?text=${that.interactions.whatsappPhraseSelected} Acesse o link: https://maisbartenders.com.br/opengraph/events/${that.event.url}`;
                window.open(url, '_system', null);
            },

            drinkToShowToggle: function (drink) {
                let that = this
                var index = that.interactions.drinksToShowInfo.indexOf(drink);
                if (index > -1) {
                    that.interactions.drinksToShowInfo.splice(index, 1)
                } else {
                    that.interactions.drinksToShowInfo.push(drink)
                }
            },

            checkIfDrinkHasCategory: function (drink) {

                if (this.currentCategory && this.currentCategory.slug_en == 'all' || this.currentCategory && this.currentCategory.slug_pt == 'todas') return true

                if (!this.filterCategory.length) return true

                return (
                    _.chain(drink.categories)
                        .map((i) => i.slug_pt)
                        .some(item => this.filterCategory.includes(item))
                        .value()
                )
            },

            addDrinkPreference: function (drink) {
                let that = this

                var data = {
                    drink_id: drink.id,
                    guest_id: this.currentUser.id
                }
                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/guest/addDrinkPreference', data)
                    .then(function (response) {

                        that.addDrinkToSavedDrinks(drink) // this is a Vuex action

                        successNotify('', 'Drink salvo com sucesso!')
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {

                        errorNotify('Ops!', 'Ocorreu um erro ao salvar seu drink!')
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            saveComment: function () {
                let that = this

                if (!that.newComment.comment) {
                    errorNotify('', 'Digite seu comentário para o evento')
                    return
                }

                var data = {
                    event_id: that.event.id,
                    guest_id: that.currentUser.id,
                    comment: that.newComment.comment,
                }

                that.$http.post('/guest/eventComment', data)
                    .then(function (response) {

                        that.interactions.phraseSelected = ''
                        that.comments.unshift(response.data.comment)
                        that.pagination.total = that.pagination.total + 1
                        that.resetComment()
                        successNotify('', 'Comentário salvo com sucesso.');
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            getItemsByCategory: function (category) {
                var that = this
                return _.chain(that.event.drinks)
                    .map((drink) => drink.items.map((item) => {
                        if (item.category.toLowerCase() === category) return item.name
                    }))
                    .flatten()
                    .filter((item) => item !== undefined)
                    .reduce((a, b) => {
                            if (a.indexOf(b) < 0) a.push(b);
                            return a
                        }
                        , [])
                    .value()
            },

            getEvent: function () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/events/show/' + that.$route.params.event_slug)
                    .then(function (response) {

                        that.event = response.data;
                        that.eventFound = true
                        that.getFormatedDates()
                        that.event.typeImg = that.event.photo_url.split('.').pop()
                        that.event.drinks.forEach(function (drink) {
                            drink.typeImg = drink.photo_url.split('.').pop()
                        })
                        that.event.drink_categories = _.orderBy(that.event.drink_categories, ['name_pt'], ['asc'])

                        that.$nextTick(() => {
                            let currentCategory = JSON.parse(localStorage.getItem('selected_category'))
                            if (currentCategory) {

                                if (currentCategory.slug_pt == 'todas' || currentCategory.slug_en == 'all') {
                                    that.selectCategory(that.categoryAll)
                                } else {
                                    let category = _.find(that.event.drink_categories, {name_pt: currentCategory.name_pt})

                                    if (category) {
                                        that.selectCategory(category)
                                    }
                                }
                            }
                        })

                        that.checkRemainTime();
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.eventFound = false;
                        that.setLoading({is_loading: false, message: ''})
                    });

            },


            getEventComments: function () {
                let that = this
                that.$http.get('/events/comments/' + that.$route.params.event_slug)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }


                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            navigate(page) {
                let that = this
                that.$http.get('/events/comments/' + that.$route.params.event_slug + '?page=' + page)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            likeDrink(drink) {
                let that = this

                let data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                if (that.userDrinkLikes.checkFromAttr('drink_id', drink.id)) {
                    that.removeUserDrinkLike({"drink_id": drink.id})
                    drink.likes_count = drink.likes_count - 1
                } else {
                    that.addUserDrinkLike({"drink_id": drink.id})
                    drink.likes_count = drink.likes_count + 1
                }

                that.$http.post('/guest/likeDrink', data)
                    .then(function (response) {

                    })
                    .catch(function (error) {

                        if (!that.userDrinkLikes.checkFromAttr('drink_id', drink.id)) {
                            that.removeUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count - 1
                        } else {
                            that.addUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count + 1
                        }

                    });
            },

            handleLikedDrinks(drink_id) {
                return this.userDrinkLikes.find(like => like.drink_id === drink_id) ? true : false
            },

            // Saving Event Image
            downloadEventCoverPhoto: function () {
                let that = this
                let fileTransfer = new FileTransfer();

                const eventFile = `evento-${ that.event.url }.${ that.event.photo_url.split('.').pop() }`

                that.setLoading({is_loading: true, message: 'Salvando imagem do evento'})
                fileTransfer.download(
                    that.event.photo_url,
                    `${ cordova.file.dataDirectory }/${ eventFile }`,
                    function (entry) {
                        console.log(entry);
                        that.setLoading({is_loading: false, message: ''})
                    },
                    function (error) {
                        console.log(error);
                        that.setLoading({is_loading: false, message: ''})
                        errorNotify('', 'Não foi possível salvar a imagem do evento no dispositivo.')
                    },
                    true
                );
            },

            // Saving Drinks Images
            downloadDrinks: function () {
                let that = this
                let fileTransfer = new FileTransfer();

                that.setLoading({is_loading: true, message: `Salvando imagens dos drinks`})

                that.event.drinks.map(function (drink, index) {
                    const drinkFile = `drink-${ drink.url }.${ drink.photo_url.split('.').pop() }`

                    fileTransfer.download(
                        drink.photo_url,
                        `${ cordova.file.dataDirectory }/${ drinkFile }`,
                        function (entry) {
                            console.log(entry);
                        },
                        function (error) {
                            console.log(error);
                            errorNotify('', 'Não foi possível salvar a imagem do evento no dispositivo.')
                        },
                        true
                    );
                })

                that.setLoading({is_loading: false, message: ''})

            },

            saveEvent: function () {
                let that = this

                var events = JSON.parse(localStorage.getItem('events'));

                if (Array.isArray(events) && events.length) {

                    if (window.cordova) {
                        that.downloadEventCoverPhoto()
                        that.downloadDrinks()
                    }

                    var index = events.indexFromAttr('id', that.event.id);

                    if (index > -1) {
                        events[index] = that.event;
                    } else {
                        events.push(that.event);
                    }

                    var events = JSON.stringify(events);
                    localStorage.setItem('events', events);
                    successNotify('', 'Evento salvo no dispositivo.')

                } else {

                    that.$swal({
                        title: 'Informe uma senha deste dispositivo',
                        input: 'number',
                        showCancelButton: true,
                        confirmButtonText: 'Salvar',
                        showLoaderOnConfirm: true,
                        preConfirm: function (pass) {
                            return new Promise(function (resolve, reject) {

                                setTimeout(function () {
                                    if (!pass) {
                                        reject('Insira uma senha.')
                                    } else {
                                        resolve()
                                        if (window.cordova) {
                                            that.downloadEventCoverPhoto()
                                            that.downloadDrinks()
                                        }
                                    }
                                }, 2000)
                            })

                        },
                        allowOutsideClick: false
                    }).then(function (pass) {

                        var events = JSON.stringify([that.event]);
                        localStorage.setItem('events', events);
                        localStorage.setItem('device_pass', pass);

                        that.$swal({
                            type: 'success',
                            title: 'Evento salvo com sucesso!',
                            html: 'A senha do dispositivo é: ' + pass
                        })

                    })

                }
            },

            saveNewEvent: function () {
                let that = this


            },

            applyCategoryFilter(category_slug) {
                let index = this.filterCategory.indexOf(category_slug)

                if (index > -1) {
                    this.filterCategory.splice(index, 1)
                } else {
                    this.filterCategory.push(category_slug)
                }
            },

            selectCategory(category) {
                let that = this

                that.setLoading({is_loading: true, message: ''})
                that.currentCategory = category;
                that.applyCategoryFilter(category.slug_pt)

                that.setSelectedCategory(category)

                setTimeout(function () {
                    that.interactions.is_loading = false;
                    that.interactions.finished_loading_category = true;
                    that.setLoading({is_loading: false, message: ''})

                }, 500);

                that.$nextTick(() => {
                    that.$scrollTo('#drinks')
                })
            },

            resetCategory() {
                let that = this
                that.setLoading({is_loading: true, message: ''})

                setTimeout(function () {
                    that.currentCategory = null;
                    that.filterCategory = [];
                    that.interactions.finished_loading_category = false;
                    localStorage.removeItem('selected_category')
                    that.setLoading({is_loading: false, message: ''})
                }, 500);

                that.$nextTick(() => {
                    that.$scrollTo('#categories')
                })
            },

            resetComment() {
                let that = this
                that.newComment.comment = '';
                $('#modal-comment').modal('hide');
            }
        }
    }
</script>

<style scoped>

    .svg-container.min {
        width: 40px;
    }

    .btn.btn-mb-info.btn-fixed-bottom.btn-save {
        border-radius: 0 0 10px 10px;
    }

    .title-section {
        font-size: 30px;
    }

    .header-greeting {
        position: relative;
    }

    .btn-back {
        position: absolute;
        top: 94px;
        left: 25px;
        border-color: #fed136 !important;
        background-color: #fed136 !important;
        color: #000 !important
    }

    /* END SWIPER */

    .btn-tag {
        background-color: #C0C0C0;
        color: #2C3E50;
    }

    .comment-date {
        font-weight: 400;
        margin-top: -80px;
        font-size: 12px;
    }

    /* Some Default Styles for page*/
    .sub {
        font-weight: bold;
        text-transform: uppercase;
        display: block;
    }

    .btn-xl.all {
        font-weight: bold;
        margin: 20px 0;
        padding: 10px 20px;
        color: #2c3e50;
    }

    /* Page & Grid*/

    .page {
        margin-top: 80px;
    }

    #most-recommended {
        margin: 20px auto;
    }

    #drinks {
        background-color: #fff;
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

    /* Like button */
    .btn-like {
        background-color: transparent;
    }

    .btn-like:hover {
        color: #e74c3c;
    }

    .box-shadow-divider {
        box-shadow: 0px 2px 3px rgba(0, 0, 0, .1), 0px -2px 3px rgba(0, 0, 0, .1);
    }

    .cat-icon {
        width: auto;
        height: 60px;
    }

    .card-cat {
        box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    }


</style>
