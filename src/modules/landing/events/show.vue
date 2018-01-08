<template>
    <div class="first-container show" ref="container">

        <main-header :title="eventFound ? event.name : 'Evento não encontrado'" />

        <!-- EventFound -->
        <div v-if="eventFound">

            <!-- Event Photo -->
            <div class="show-header cover" v-bind:style="{ backgroundImage: eventBackground }">
            </div>

            <!-- Tabs  -->
            <div id="show-tabs" class="tabs">
                <span class="tab" :class="{ 'active': tab === 'about'  }" @click="switchTabs('about')">Sobre</span>
                <span class="tab" :class="{ 'active': tab === 'drinks'  }" @click="switchTabs('drinks')">Drinks</span>
                <span class="tab" :class="{ 'active': tab === 'comments'  }" @click="switchTabs('comments')">Comentários</span>
            </div>

            <!-- Icon SVG + Title -->
            <div class="container text-center p-t-30" style="position: relative">
                <!-- Event Name -->
                <!-- <div v-html="event.greeting">
                </div> -->
                <h4 class="m-t-0 title-section">{{ event.name }}</h4>
                <!-- Event HashTag -->
                <span class="hashtag btn btn-mb-primary" v-if="event.hashtag">{{ event.hashtag }}</span>

            </div>

            <!-- Container Colored -->
            <div class="container-colored m-t-30">
                <div class="container">

                    <about :event="event" v-if="tab === 'about'" />
                    <drinks :event="event" v-if="tab === 'drinks'" />
                    <comments :event="event" v-if="tab === 'comments'" />

                </div>
            </div>


            <button class="btn btn-mb-info btn-fixed-bottom" style="position: fixed;" @click="saveEvent()">Salvar evento no dispositivo</button>

        </div>

        <div v-if="!eventFound">
            <header id="header-drink" class="header-greeting">
                <div class="container">
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="intro-text">
                        <span class="text-box">
                            <span class="event-name">
                                Ops!
                            </span>
                            <br>
                            <span class="event-greeting">
                                Não localizamos o evento informado! :(
                            </span>
                        </span>
                            <br>
                            <router-link
                                :to="{name: 'landing.drinks.list'}"
                                class="btn btn-xl m-t-30"
                                @click="closeMenu()">
                                Ir para cardápio completo
                            </router-link>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <div class="modal fade" id="modalShareWhatsApp" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Escolha uma frase</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>
                            Escolha uma frase e compartilhe com seus amigos este evento no WhatsApp.</p>
                        <br>

                        <p class="phrase" v-for="(phrase, index) in whatsappPhrases"
                           @click="interactions.whatsappPhraseSelected = phrase"
                           :class="{'phraseSelected' : interactions.whatsappPhraseSelected == phrase}">{{phrase}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default m-b-10 btn-success btn-block"
                                @click="openShareWhatsapp()"
                                :disabled="!interactions.whatsappPhraseSelected">Compartilhar no WhatsApp <i
                            class="fa fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    Vue.use(require('vue-moment'));
    import { mapGetters, mapActions } from 'vuex'
    import { transition } from 'jquery.transit'

    import eventObj from '../../../models/Event.js'
    import drinkObj from '../../../models/Drink.js'
    import moment from 'moment'
    import mainHeader from '@/components/main-header.vue'
    import pagination from '@/components/pagination'

    import allDrinks from '../../../assets/images/todos_drinks.svg'

    import about from './show_partials/about'
    import drinks from './show_partials/drinks'
    import comments from './show_partials/comments'


    export default {
        name: 'show-event',
        components: {
            pagination,
            mainHeader,
            about,
            drinks,
            comments
        },
        data() {
            return {
                tab: 'about',
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
                }
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),

            isMobile: function () {
                return window.screen.width <= 768 ? true : false
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

            switchTabs: function (tab) {
                this.tab = tab
            },

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

                        that.checkRemainTime();
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

        }
    }
</script>

<style scoped>

    /*Hashtag*/
    .hashtag .label.label-primary {
        font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #222;
        border-color: #222;
        color: rgba(254, 209, 54, .9);
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

    .box-shadow-divider {
        box-shadow: 0px 2px 3px rgba(0, 0, 0, .1), 0px -2px 3px rgba(0, 0, 0, .1);
    }

    /* The_Date */
    .the_date {
        color: #DEB62F;
    }

    .the_date {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        background-color: rgba(0, 0, 0, 1);
        border-color: #000;
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -50px;
        padding: 15px 10px;
    }

    .the_date_border {
        position: absolute;
        width: 90px;
        height: 90px;
        top: 50%;
        left: 50%;
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
        font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    }

    .the_date .date_y {
        font-size: 20px;
        align-self: flex-end;
    }

    .the_date .date_m {
        font-size: 12px;
        align-self: center;
    }

    .the_date .date_d {
        font-size: 16px;
        align-self: flex-start;
    }

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
        width: auto;
        text-align: center;
        display: inline-block;
        margin: 0 10px;
    }

    .countdown strong {
        display: block;
        font-size: 50px;
        font-weight: 300;
    }

    .countdown small {
        display: block;
        font-weight: 700;
        font-size: 15px;
    }

    @media (max-width: 580px) {
        .countdown strong {
            font-size: 24px;
        }

        .countdown small {
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


</style>
