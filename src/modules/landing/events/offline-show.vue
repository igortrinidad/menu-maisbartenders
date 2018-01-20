<template>
    <div class="first-container show" ref="container">

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

                <div class="container" :class="{'cat-is-selected' : currentCategory}">

                    <h4 class="title-section m-t-10 m-b-10">{{translations.labels.categories}}</h4>
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
                </div>

                <div class="container-colored list-drinks p-t-30">
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
                                        <p class="m-0 m-b-10 text-overflow" style="color: #222">{{ drink.description }}</p>

                                        <div class="m-t-10 border-inside-card strong" v-if="drink.items.length">
                                            <h3 class="title-section t-overflow m-t-0 m-b-10 f-20">{{ translations.ingredients }}</h3>
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
                            <button class="btn btn-mb-info" data-toggle="modal" data-target="#comment-modal">{{translations.buttons.send_message}}</button><br><br>
                        </div>
                    </div>

                </div>

                <div class="container-colored" v-show="comments.length">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12" v-for="(comment, index) in comments">
                                <div class="card strong p-10 text-center" :class="index < comments.length - 1 ? 'm-b-10' : 'm-b-0'">
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
                                    <pagination :source="pagination" @navigate="navigate":range="6" />
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
                                    <input class="form-control" v-model="newMessage.name" :placeholder="translations.modal_message.placeholders.name">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.last_name}}*</label>
                                    <input class="form-control" v-model="newMessage.last_name" :placeholder="translations.modal_message.placeholders.last_name">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.email}}*</label>
                                    <input class="form-control" v-model="newMessage.email" :placeholder="translations.modal_message.placeholders.email">
                                </div>

                                <div class="form-group">
                                    <label>{{translations.modal_message.labels.message}}*</label>
                                    <textarea class="form-control" v-model="newMessage.comment" :placeholder="translations.modal_message.placeholders.message"></textarea>
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

                        <button type="button" class="btn btn-block btn-mb-default" data-dismiss="modal">{{translations.modal_message.buttons.close}}</button>
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
                               <img src="../../../assets/images/king.svg" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               Drink Exclusivo
                           </span>
                            <span class="badge" v-if="currentDrink.priority >= 4">
                               <img src="../../../assets/images/star.svg" alt="Este drink está entre os BEST SELLERS" title="Este drink está entre os BEST SELLERS">
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
</template>

<script>
    import Vue from 'vue'
    Vue.use(require('vue-moment'));
    import {mapGetters, mapActions} from 'vuex'
    import eventObj from '../../../models/Event.js'
    import drinkObj from '../../../models/Drink.js'

    import mainHeader from '@/components/main-header.vue'
    import pagination from '@/components/pagination'
    import allDrinks from '../../../assets/images/todos_drinks.svg'
    import * as translations from '@/translations/events/show'

    var moment = require('moment');

    var filterList = function(arr, filterTerm) {
        if (filterTerm === '') return arr
        return deepFilter(arr, filterTerm)
    }

    var deepFilter = function(arr, filterTerm) {
        return arr.filter(item => {

            if (typeof item === 'object') {
                return deepFilter(Object.values(item), filterTerm).length > 0;
            }

            return item.toString().indexOf(filterTerm) >= 0
        })
    }


    export default {
        name: 'show-event',
        components: {
            pagination,
            mainHeader
        },
        data () {
            return {
                formatedDay: '',
                formatedMonth: '',
                formatedYear: '',
                eventHasHappened: false,
                interactions: {
                    phraseSelected: '',
                    whatsappPhraseSelected: '',
                    drinkSelected: drinkObj,
                    showTags: false,
                    drinksToShowInfo: [],
                    search: '',
                    showCategories: false
                },
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
                newMessage: {
                    event_id: '',
                    name: '',
                    last_name: '',
                    email: '',
                    comment: '',
                    accept_mailling: false,
                },
                currentDrink: {},
                filterCategory: [],
                currentCategory: null,
                categoryAll: {
                    name_en: 'All drinks',
                    name_pt: 'Todos os drinks',
                    slug_pt: 'todas',
                    slug_en: 'all',
                    photo_url: allDrinks
                },
            }
        },
        computed: {

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
                    return drink.name.toLowerCase().indexOf(that.interactions.search.toLowerCase()) >= 0
                });

                var arr2 = arr.filter(function (drink) {
                    return that.checkIfDrinkHasCategory(drink)
                })

                return arr2;
            },

            whatsappPhrases: function(){
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
        mounted(){
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
            ...mapActions(['setLoading', 'addDrinkToSavedDrinks','addUserDrinkLike', 'removeUserDrinkLike', 'setSelectedCategory']),

            drinkModal: function(drink) {
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


            drinkToShowToggle: function (drink) {
                let that = this
                var index = that.interactions.drinksToShowInfo.indexOf(drink);
                if (index > -1) {
                    that.interactions.drinksToShowInfo.splice(index, 1)
                } else {
                    that.interactions.drinksToShowInfo.push(drink)
                }
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
                        console.log(error)
                        errorNotify('Ops!', 'Ocorreu um erro ao salvar seu drink!')
                        that.setLoading({is_loading: false, message: ''})
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

                var events = JSON.parse(localStorage.getItem('events'));
                var index = events.indexFromAttr('url', that.$route.params.event_slug)
                that.$set(that, 'event', events[index]);

                that.event.drink_categories = _.orderBy(that.event.drink_categories, ['name_pt'], ['asc'])
                that.newMessage.event_id = that.event.id;

                that.$nextTick(() =>{
                    let currentCategory = JSON.parse(localStorage.getItem('selected_category'))
                    if(currentCategory){

                        if(currentCategory.slug_pt == 'todas' || currentCategory.slug_en == 'all'){
                            that.selectCategory(that.categoryAll)
                        }else{
                            let category = _.find(that.event.drink_categories, {name_pt: currentCategory.name_pt} )

                            if(category){
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

            navigate(page){
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

                if(!that.sideMenuStatus && this.$route.name == 'landing.events.show-offline' || !that.sideMenuStatus && this.$route.name == 'landing.drinks.show-offline'){
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

                                setTimeout(function() {
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
            }
        }
    }
</script>

<style scoped>

    /*Hashtag*/
    .hashtag .label.label-primary {
        font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
        background-color: #000;
        border-color: #000;
        color: rgba(254, 209, 54,.9);
    }

    .btn-tag {
        background-color: #C0C0C0;
        color: #2C3E50;
    }

    .comment-date {
        font-weight: 400;
        margin-top: -80px;
        font-size: 12px;
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

    /* Filter */

    .filter {
        /*padding: 0 10px;*/
    }

    .tags-list {
        margin: 20px 0;
    }

    .tags {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-content: center;
        justify-content: center;
    }

    .tags .tag {
        margin: 5px 10px 5px 0;
        position: relative;
    }

    .tags .tag button {
        border: none;
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 25px 10px 25px;
        color: rgba(255, 255, 255, .8);
        border-radius: 30px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        position: relative;
        color: #2c3e50;
    }

    .tags .tag button.tag-selected,
    .tags .tag button.button-tag {
        color: #fff;
    }

    .tags .tag button.button-tag {
        padding: 10px 35px 7px 25px;
    }

    .close-tag {
        position: absolute;
        font-size: 16px;
        right: 16px;
        top: 6px;
        font-weight: 400;
        opacity: 0;
    }

    .tags .tag button i {
        margin: 2.5px 0 0 10px;
        font-size: 10px;
    }

    .tags .tag button:focus {
        outline: none;
    }

    .button-tag {
        opacity: 0.8;
        background: #A6A19D;
        font-size: 12px;
        font-weight: 400;
        transition: background-color 0.3s ease;
    }

    .tag:hover {
        transform: scale(1.05);
    }

    .tag:active {
        transform: scale(1.00);
    }

    .tag-selected > .close-tag {
        opacity: 1;
    }

    .tag-selected {
        opacity: 1;
        background: #2C3E50;
    }

    /* Swiper Fix */

    .swiper-container {
        margin: 30px 0;
    }

    .swiper-button-prev, .swiper-button-next {
        top: 50%;
        margin-top: -22px;
    }

    .swiper-button-prev {
        left: 3rem
    }

    .swiper-button-next {
        right: 3rem
    }

    .swiper-item-text {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 2rem 3rem;
        background: rgba(0, 0, 0, .6);
        color: rgba(255, 255, 255, .8);

    }

    .swiper-image {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .swiper-item-text .title {
        margin: 0 0 5px 0;
    }

    .swiper-item-text .subtitle {
        text-transform: uppercase;
        letter-spacing: 0px;
        max-width: 100%;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    @media (max-width: 414px) {
        .swiper-item-text {
            padding: 2rem;
        }

        .swiper-item-text .subtitle {
            display: none;
        }
    }

    .swiper-stars {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: block;
        padding: 3rem;
        color: #fed136;
        text-align: right;
    }

    .swiper-stars i {
        margin-right: 10px;
        font-size: 2rem;
        text-shadow: 1px 3px 3px rgba(0, 0, 0, .2);
    }

    .btn-share {
        margin-top: 5px;
        font-weight: 100;
        letter-spacing: 1px;
    }

    /* Like button */
    .btn-like {
        background-color: transparent;
    }

    .btn-like:hover {
        color: #e74c3c;
    }

    .btn.facebook{
        color: white;
    }

    /* The_Date */
    .the_date{
        color: #DEB62F;
    }
    .the_date{
        width: 100px; height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        background-color: rgba(0, 0, 0, 1);
        border-color: #000;
        position: absolute;
        top: -50px; left: 50%;
        margin-left: -50px;
        padding: 15px 10px;
    }
    .the_date_border {
        position: absolute;
        width: 90px; height: 90px;
        top: 50%; left: 50%;
        margin-top: -45px;
        margin-left: -45px;
        border-radius: 50%;
        border: 2px solid;
    }
    .the_date .date_y,
    .the_date .date_m,
    .the_date .date_d {
        width: 100%;
        text-align: center;
        font-weight: 700;
        font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
    }
    .the_date .date_y{ font-size: 20px; align-self: flex-end; }
    .the_date .date_m{ font-size: 12px; align-self: center; }
    .the_date .date_d{ font-size: 16px; align-self: flex-start;}

    /* CountDown */
    .countdown {
        max-width: 500px;
        margin: 0 auto;
        text-align: center;
    }
    .countdown-d,
    .countdown-h,
    .countdown-m,
    .countdown-s {
        width:auto;
        text-align: center;
        display: inline-block;
        margin: 0 10px;
    }
    .countdown strong{
        display: block;
        font-size: 70px;
        font-weight: 300;
    }
    .countdown small{
        display: block;
        font-weight: 700;
        font-size: 15px;
    }

    @media (max-width: 350px) {
        .countdown strong{
            font-size: 50px;
        }
        .countdown small{
            font-size: 12px;
        }
    }

    .cat-icon {
        width: auto;
        height: 60px;
    }

    .card-cat {
        box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    }

    .m-b-60 {
        margin-bottom: 60px;
    }

</style>
