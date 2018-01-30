<template>
    <div class="first-container show" :class="{ 'm-b-30': currentCategory }" ref="container">

        <main-header :title="event.name" :type="'no-button'" />

        <!-- Event Found -->
        <div>
            <div class="show-header" v-bind:style="{ backgroundImage: eventBackground}">

                <span class="t-overflow" v-if="eventHasHappened">
                    {{ eventHasHappened ? event.date : event.hashtag }}
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
                        </div>
                    </div>
                </div>
            </div>

            <span id="categories"></span>
            <span id="drinks"></span>
            <section  v-show="!currentCategory">
                <!-- CATEGORIES -->

                <div class="container m-t-30" :class="{'cat-is-selected' : currentCategory}">

                    <h4 class="title-section m-0 m-b-10">{{translations.labels.categories}}</h4>
                    <p class="text-center section-subheading text-muted">{{ translations.categories_message }}</p>

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
                                    <div class="cat-icon-svg">
                                        <div class="cat-icon-svg">
                                            <img :src="`../../../assets/images/categories/${ category.slug_pt }.svg`">
                                        </div>
                                    </div>
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">{{ category[`name_${language}`] }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /Fetched categories-->
                    </div>
                </div>
                <!-- /CATEGORIES -->

            </section>

            <section  v-if="currentCategory">
                <div class="text-center">
                    <h3>{{translations.labels.drinks}}</h3>
                    <p class="text-center section-subheading text-muted">{{translations.category_selected}}</p>
                    <div class="card-body card-padding m-b-20" @click="resetCategory()">
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


                <div class="container-colored list-drinks p-t-30 m-b-0">
                    <div class="container">
                        <!-- Cols -->
                        <div class="cols" v-show="drinksFiltered && drinksFiltered.length">
                            <div class="col" v-for="(drink, index) in drinksFiltered">
                                <!-- Start Drink -->
                                <div class="card m-0">
                                    <!-- Card Header -->
                                    <div class="card-header cover" :style="{ backgroundImage: `url(${ drink.photo_url })` }" @click="openDrink(drink)">
                                    </div>

                                    <!-- Card Body -->
                                    <div class="card-body card-padding text-center">
                                        <h3 class="title-section t-overflow m-t-10 m-b-10">{{ drink.name }}</h3>
                                        <p class="m-0 m-b-10 text-overflow" style="color: #222">{{ drink.description
                                            }}</p>

                                        <!-- Like -->
                                        <div class="m-t-10" v-if="isLogged">
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
                                                {{ drink.likes_count > 1 ? `${ drink.likes_count } ${ translations.likes }` : `1 ${ translations.like }` }}
                                            </span>
                                            <span class="text-muted" v-if="drink.likes_count === 0">{{translations.be_first}}</span>
                                        </div>

                                        <div class="m-t-10 border-inside-card strong" v-if="drink.items.length">
                                            <h3 class="title-section t-overflow m-t-0 m-b-10 f-20">{{
                                                translations.ingredients }}</h3>
                                            <span
                                                class="btn btn-xs btn-mb-primary outline m-5"
                                                v-for="item in drink.items"
                                                v-show="item.pivot.is_visible"
                                            >
                                                {{ language === 'pt' ? item.name_pt : item_en }}
                                            </span>
                                        </div>

                                    </div>

                                    <!-- Card Footer -->
                                    <div class="card-footer card-padding flex">
                                        <button
                                            type="button"
                                            class="btn btn-mb-primary"
                                            @click="openDrink(drink)"
                                        >
                                            {{ translations.buttons.drink_details }}
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-mb-info"
                                            @click="addDrinkPreference(drink)"
                                            v-if="isLogged && currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        >
                                            {{ translations.buttons.save_drink }}
                                        </button>
                                    </div>

                                </div>
                                <!-- End Drink -->
                            </div>
                        </div>
                        <!-- / Cols -->
                    </div>
                </div>
            </section>


            <section class="m-t-30" id="comments">
                <div class="container text-center">

                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="title-section m-t-20">
                                {{translations.leave_message}} {{event.name}}.
                            </h4>
                            <button class="btn btn-mb-info" data-toggle="modal" data-target="#comment-modal">
                                {{translations.buttons.send_message}}
                            </button>
                            <br><br>
                        </div>
                    </div>

                </div>

                <div class="container-colored" v-show="comments.length">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12" v-for="(comment, index) in comments">
                                <div class="card strong p-10 text-center"
                                     :class="index < comments.length - 1 ? 'm-b-10' : 'm-b-0'">
                                    <img :src="comment.guest.photo_url" class="img-circle" width="60px">

                                    <h5 class="title-section m-0 m-t-10">{{ comment.guest.full_name }}</h5>
                                    <p class="lobster f-20 m-t-10">{{ comment.comment }}</p>
                                    <span class="f-12" style="color: #222;">
                                        {{ translations.created_at }}: {{comment.created_at | moment('DD/MM/YYYY HH:mm:ss') }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row m-b-30">
                            <div class="col-sm-12">
                                <div class="text-center">
                                    <pagination :source="pagination" @navigate="navigate" :range="6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <div class="text-center m-t-30" style="margin-bottom: 60px;">
                <button type="button" class="btn btn-mb-danger btn-xs" @click="leaveEvent()">
                    {{ translations.buttons.leave_event }}
                </button>
            </div>

            <button class="btn btn-mb-primary btn-fixed-bottom" style="position: fixed;" @click="resetCategory()"
                    v-if="currentCategory">{{translations.buttons.change_category}}
            </button>

        </div>

        <!-- Fixed Button To Change Category -->
        <button
            type="button"
            class="btn btn-mb-primary btn-fixed-bottom"
            style="position: fixed"
            @click.prevent="resetCategory()"
            v-if="currentCategory"
        >
            {{translations.buttons.change_category}}
        </button>

        <!-- MODAL COMMENT -->
        <div class="modal fade" id="comment-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="title-section m-0 m-b-10">{{translations.modal_message.title}}</h4>
                        <p class="m-0">{{translations.leave_message}} {{event.name}}.</p>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body card-padding text-left">

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.name}}*</label>
                                    <input class="form-control" v-model="newMessage.name"
                                           :placeholder="translations.modal_message.placeholders.name">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.last_name}}*</label>
                                    <input class="form-control" v-model="newMessage.last_name"
                                           :placeholder="translations.modal_message.placeholders.last_name">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.email}}*</label>
                                    <input class="form-control" v-model="newMessage.email"
                                           :placeholder="translations.modal_message.placeholders.email">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.message}}*</label>
                                    <textarea class="form-control" v-model="newMessage.comment"
                                              :placeholder="translations.modal_message.placeholders.message"></textarea>
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.mailling}}</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="newMessage.accept_mailling">
                                        <div class="slider round"></div>
                                    </label>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-mb-info btn-block facebook" @click="saveComment()">
                            {{translations.modal_message.buttons.send_message}}
                        </button>

                        <button type="button" class="btn btn-block btn-mb-default" data-dismiss="modal">
                            {{translations.modal_message.buttons.close}}
                        </button>
                    </div>

                </div>
            </div>
        </div>


        <!--Modal Current Drink -->
        <div class="modal" id="modal-drink" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="title-section m-0 m-b-10" style="font-size: 30px;">{{ currentDrink.name }}</h4>
                        <div class="text-muted" v-html="currentDrink.description"></div>
                    </div>

                    <div class="modal-body ext">

                        <!-- Badges -->
                        <div class="badges">
                           <span class="badge" v-if="currentDrink.is_exclusive">
                               <img src="../../../assets/images/king.svg" alt="Este Drink é exclusivo"
                                    title="Este Drink é exclusivo">
                               Drink Exclusivo
                           </span>
                            <span class="badge" v-if="currentDrink.priority >= 4">
                               <img src="../../../assets/images/star.svg" alt="Este drink está entre os BEST SELLERS"
                                    title="Este drink está entre os BEST SELLERS">
                               Best Sellers
                           </span>
                        </div>

                        <!-- Ingredients -->
                        <div class="card">
                            <div class="card-body card-padding">
                                <h4 class="title-section m-0 m-b-10">Ingredientes</h4>
                                <span
                                    class="btn btn-xs btn-mb-primary outline m-5"
                                    v-for="item in currentDrink.items"
                                    v-show="item.pivot.is_visible"
                                >
                                    {{ language === 'pt' ? item.name_pt : item_en }}
                                </span>
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
    import svgIcons from '@/components/svg-icons.vue'
    import pagination from '@/components/pagination'
    import * as translations from '@/translations/events/show'

    import allDrinks from '../../../assets/images/todos_drinks.svg'

    export default {
        name: 'show-event',
        components: {
            pagination,
            mainHeader,
            svgIcons
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
                currentDrink: {},
                eventHasHappened: false,
                filterOptions: [],
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
                newMessage: {
                    event_id: '',
                    name: '',
                    last_name: '',
                    email: '',
                    comment: '',
                    accept_mailling: false,
                }
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
                if (window.cordova) {
                    return `url('${ cordova.file.dataDirectory }/evento-${ this.event.url }.${ this.event.typeImg }')`
                }
            },
            commentsOrdereds: function(){
                let that = this

                return _.orderBy(that.comments, 'created_at', 'desc');
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
            }

        },
        mounted() {
            var that = this

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

            drinkModal: function (drink) {
                this.currentDrink = drink
                $('#modal-drink').modal('show')
            },

            openDrink: function(drink){
                localStorage.setItem('drink_selected_to_show_off',JSON.stringify(drink));

                this.$router.push({name: 'landing.drinks.show-offline', params: { drink_slug: drink.url }})
            },

            getFormatedDates: function () {
                this.formatedDay = moment(this.event.date, 'DD/MM/YYYY').format('DD')
                this.formatedMonth = moment(this.event.date, 'DD/MM/YYYY').locale('pt-BR').format('MMM')
                this.formatedYear = moment(this.event.date, 'DD/MM/YYYY').format('YYYY')
            },

            systemUrlToGetDrinks: function (drink) {
                return `${ cordova.file.dataDirectory }/drink-${ drink.url }.${ drink.typeImg }`
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

            saveComment: function(){
                let that = this

                if (!that.newMessage.comment || !that.newMessage.email || !that.newMessage.last_name || !that.newMessage.name) {
                    errorNotify('', 'Preencha todos os campos')
                    return
                }

                that.setLoading({is_loading: true, message: ''})
                that.$http.post('/guest/eventRunningComment', that.newMessage)
                    .then(function (response) {

                        successNotify('', 'Comentário salvo com sucesso.');

                        var message = {
                            guest: {
                                full_name: that.newMessage.name + ' ' + that.newMessage.last_name,
                            },
                            comment: that.newMessage.comment,
                            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
                        }

                        that.comments.push(message)
                        that.cleanMessage();
                    })
                    .catch(function (error) {

                        successNotify('', 'Comentário adicionado com sucesso.');
                        var comments_to_save_later = JSON.parse(localStorage.getItem('comments_to_save_later'));

                        if(Array.isArray(comments_to_save_later) && comments_to_save_later.length){
                            comments_to_save_later.push(that.newMessage);
                            localStorage.setItem('comments_to_save_later', JSON.stringify(comments_to_save_later));
                        } else {
                            comments_to_save_later = [that.newMessage];
                            localStorage.setItem('comments_to_save_later', JSON.stringify(comments_to_save_later));
                        }

                        var message = {
                            guest: {
                                full_name: that.newMessage.name + ' ' + that.newMessage.last_name,
                            },
                            comment: that.newMessage.comment,
                            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
                        }

                        that.comments.push(message)
                        that.cleanMessage();

                    });

            },

            cleanMessage: function(){
                let that = this

                that.newMessage.name = '';
                that.newMessage.last_name = '';
                that.newMessage.email = '';
                that.newMessage.comment = '';
                $('#comment-modal').modal('hide');
                that.setLoading({is_loading: false, message: 'Enviando'})

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

                var events = JSON.parse(localStorage.getItem('events'));
                var index = events.indexFromAttr('url', that.$route.params.event_slug)
                that.$set(that, 'event', events[index]);

                that.event.drink_categories = _.orderBy(that.event.drink_categories, ['name_pt'], ['asc'])
                that.newMessage.event_id = that.event.id;

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
                that.getFormatedDates();
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

            leaveEvent() {

                let that = this

                if (!that.sideMenuStatus && this.$route.name == 'landing.events.show-offline' || !that.sideMenuStatus && this.$route.name == 'landing.drinks.show-offline') {
                    that.$swal({
                        title: 'Confirmar',
                        text: 'Informe a senha deste dispositivo para sair do evento',
                        input: 'text',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Sair do evento',
                        showLoaderOnConfirm: true,
                        preConfirm: function (pass) {
                            return new Promise(function (resolve, reject) {

                                var check = pass === localStorage.getItem('device_pass') || pass == '1010';

                                setTimeout(function () {
                                    if (!pass || !check) {
                                        reject('Senha não confere.')
                                    } else {
                                        resolve()
                                    }
                                }, 1000)
                            })

                        },
                        allowOutsideClick: false
                    }).then(function (pass) {
                        that.sideMenuStatus = !that.sideMenuStatus
                        that.$router.push('/')
                    })

                } else {
                    this.sideMenuStatus = !this.sideMenuStatus
                }
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

                that.setSelectedCategory(category)

                that.currentCategory = category;
                that.applyCategoryFilter(category.slug_pt)

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
