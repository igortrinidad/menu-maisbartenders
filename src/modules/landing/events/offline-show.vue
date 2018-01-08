<template>
    <div>

        <main-header :title="'Evento não econtrado'" v-if="!eventFound" />
        <main-header :title="event.name" v-if="eventFound" />

        <div v-if="eventFound">
            <header id="header-event" class="header-greeting" v-bind:style="{ backgroundImage: eventBackground}">
            </header>

            <section class="section p-t-30">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <h1 class="m-t-0">{{ event.name }}</h1>
                            <div v-html="event.greeting">
                            </div>
                            <hr>
                        </div>
                        <div class="col-sm-12 text-center" v-if="event.hashtag">
                            <small class="text-muted">Hashtag do evento</small>
                            <div class="hashtag m-t-15">
                                <span class="label label-primary m-r-5 f-16">
                                    {{ event.hashtag }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 col-xs-12 text-center m-t-30">
                            <button class="btn btn-success" data-toggle="modal" data-target="#modalShareWhatsApp">Compartilhar evento por WhatsApp <i class="fa fa-whatsapp"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section p-relative box-shadow-divider" style="background-color: rgba(44, 60, 80, .07)">

                <!-- Event Date -->
                <div class="the_date">
                    <span class="the_date_border"></span>
                    <span class="date_d">{{ formatedDay }}</span>
                    <span class="date_m">{{ formatedMonth }}</span>
                    <span class="date_y">{{ formatedYear }}</span>
                </div>
                <h2 class="text-center" v-if="!eventHasHappened">
                    <i class="fa fa-clock-o m-r-5"></i>{{ event.time }}
                </h2>
                <!-- / Event Date -->

                <div class="m-t-30" v-if="!eventHasHappened">
                    <h2 class="countdown-title text-center">Faltam</h2>
                    <div class="card-body card-padding">
                        <div class="countdown">
                            <span class="countdown-d">
                                <strong>{{ remain.days }}</strong>
                                <small>Dias</small>
                            </span>
                            <span class="countdown-h">
                                <strong>{{ remain.hours }}</strong>
                                <small>Horas</small>
                            </span>
                            <span class="countdown-m">
                                <strong>{{ remain.minutes }}</strong>
                                <small>Minutos</small>
                            </span>
                            <span class="countdown-s">
                                <strong>{{ remain.seconds }}</strong>
                                <small>Segundos</small>
                            </span>
                        </div>
                    </div>
                </div>

            </section>

            <span id="categories"></span>
            <span id="drinks"></span>
            <section  v-show="!interactions.finished_loading_category && !interactions.is_loading">
                <!-- CATEGORIES -->
                <h3 class="text-center">Categorias</h3>
                <div class="container"
                     :class="{'cat-is-selected' : currentCategory}">

                    <p class="text-center section-subheading text-muted">Selecione uma categoria para ver os drinks especialmente selecionados para este evento.</p>

                    <div class="categories">
                        <!-- ALL -->
                        <div class="category">
                            <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                                 @click="selectCategory(categoryAll)">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" src="../../../assets/images/todos_drinks.svg" alt="">
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">{{categoryAll['name_pt']}}</h6>
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
                                        <h6 class="card-title m-b-0">{{category['name_pt']}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /Fetched categories-->
                    </div>
                </div>
                <!-- /CATEGORIES -->

            </section>

            <section class="box-shadow-divider" style="background-color: rgba(44, 60, 80, .07)"  v-show="interactions.finished_loading_category">
                <div class="text-center" v-if="interactions.finished_loading_category">
                    <h3>Drinks</h3>
                    <p class="text-center section-subheading text-muted">Você está visualizando os drinks da categoria</p>
                    <div class="card-body card-padding m-b-20">
                        <img class="cat-icon" :src="currentCategory.photo_url" alt="">
                        <div class="m-t-5">
                            <h6 class="card-title m-b-0">{{currentCategory['name_pt']}}</h6>
                        </div>
                    </div>

                    <button type="button" class="btn btn-mb-primary "
                            @click.prevent="resetCategory()"
                    >
                        Alterar categoria
                    </button>
                </div>


                <div class="list-drinks">
                    <div class="container">
                        <div class="cols" :class="{ 'align-block': drinksFiltered.length === 2 }">
                            <div v-for="(drink, index) in drinksFiltered" class="col">
                                <div tag="div" class="drink"
                                     :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                    <div class="badges">
                                    <span class="badge" v-if="drink.is_exclusive" data-toggle="modal"
                                          data-target="#badge-help">
                                        <img src="../../../assets/images/king.png" alt="Este Drink é exclusivo"
                                             title="Este Drink é exclusivo">
                                    </span>
                                        <span class="badge" v-if="drink.priority >= 4" data-toggle="modal"
                                              data-target="#badge-help">
                                        <img src="../../../assets/images/star.png"
                                             alt="Este drink está entre os BEST SELLERS"
                                             title="Este drink está entre os BEST SELLERS">
                                    </span>
                                        <span class="badge" v-if="drink.fiancee_drink" data-toggle="modal"
                                              data-target="#badge-help">
                                           <img
                                               src="../../../assets/images/noiva.svg"
                                               alt="Este drink foi escolhido pela noiva"
                                               title="Este drink foi escolhido pela noiva">
                                        </span>
                                        <span class="badge" v-if="drink.groom_drink" data-toggle="modal"
                                              data-target="#badge-help">
                                           <img
                                               src="../../../assets/images/preferido_do_noivo.svg"
                                               alt="Este drink foi escolhido pelo noivo"
                                               title="Este drink foi escolhido pelo noivo">
                                        </span>
                                    </div>

                                    <router-link tag="span"
                                                 :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                        <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                                        <div class="details">
                                            <h3 class="drink-name">{{ drink.name }}</h3>
                                            <span class="description">{{ drink.description }}</span>
                                            <hr>
                                        </div>
                                    </router-link>

                                    <h5 class="cursor-pointer" @click="drinkToShowToggle(drink)">Ingredientes
                                        <i class="fa pull-right"
                                           :class="{'fa-plus' : interactions.drinksToShowInfo.indexOf(drink) < 0, 'fa-minus' : interactions.drinksToShowInfo.indexOf(drink) > -1}">
                                        </i>
                                    </h5>

                                    <div class="items" v-if="isLogged"
                                         :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                        <span class="drink-item" v-for="(item, index) in drink.items">
                                            <span v-show="item.pivot.is_visible">
                                                {{ item.name_pt }}
                                            </span>
                                        </span>
                                    </div>

                                    <div class="items"
                                         :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                        <span class="drink-item" v-if="!isLogged">
                                            Faça login para ver a lista de ingredientes ;)
                                        </span>
                                    </div>

                                    <div class="box-footer m-t-15" v-if="isLogged">
                                        <button
                                            class="btn btn-default m-b-10 btn-drink-action facebook btn-share btn-block"
                                            @click="addDrinkPreference(drink)"
                                            v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        >Salvar drink
                                        </button>

                                        <router-link
                                            tag="button"
                                            class="btn btn-success m-b-10 btn-drink-action btn-share btn-block"
                                            :to="{name: 'landing.user.preferences'}"
                                            v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        >Drink salvo <i class="fa fa-check"></i>
                                        </router-link>

                                        <button @click.prevent="likeDrink(drink)"
                                                class="btn btn-sm m-b-10 btn-like btn-block">
                                            <span class="text-muted">{{drink.likes_count}}</span>
                                            <i class="fa fa-heart fa-lg text-danger"
                                               v-if="handleLikedDrinks(drink.id)"></i>
                                            <i class="fa fa-heart-o fa-lg text-danger"
                                               v-if="!handleLikedDrinks(drink.id)"></i>
                                        </button>
                                    </div>

                                    <div class="box-footer" v-if="!isLogged">
                                        <router-link
                                            tag="button"
                                            class="btn btn-default m-b-10 btn-block btn-drink-action facebook btn-share"
                                            :to="{name: 'landing.auth.login', query:{redirect: '/evento/' + $route.params.event_slug}}"
                                        >Faça login para salvar drink
                                        </router-link>

                                        <router-link tag="button" class="btn btn-sm m-b-10 btn-like m-r-5 btn-block"
                                                     :to="{name: 'landing.auth.login', query:{redirect: $route.path}}">
                                            <span class="text-muted">{{drink.likes_count}}</span> <i
                                            class="fa fa-heart-o fa-lg text-danger"></i>
                                            Faça login para curtir
                                        </router-link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="text-center m-t-20 m-b-20" v-if="interactions.finished_loading_category">
                            <button type="button" class="btn btn-mb-primary "
                                    @click.prevent="resetCategory()"
                            >
                                Alterar categoria
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="comments">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <button class="btn btn-xl" data-toggle="modal" data-target="#comment-modal">Enviar mensagem</button><br><br>
                            <small class="m-t-20">
                                Compartilhe um drink através do aplicativo <b>Menu Mais Bartenders</b> ou deixe aqui uma mensagem para o {{event.name}}.
                            </small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-xs-12">

                            <h4 class="m-b-20">Mensagens ({{pagination.total}})</h4>


                            <span v-for="(comment, index) in commentsOrdereds">
                                <div class="row" v-if="comment.guest">
                                    <span class="interactions m-10 p-l-20 p-b-20">
                                        <div class="row">
                                            <div class="col-md-11 col-xs-9">
                                                <br>
                                                <span class="comment-user-name">{{comment.guest.full_name}}</span><br>
                                                <span class="text-right comment-date"><i class="fa fa-clock-o"></i> {{comment.created_at | formatTimeHumanized}}</span>
                                            </div>
                                        </div>
                                        <p class="m-t-10">{{comment.comment}}</p>

                                    </span>
                                </div>
                            </span>

                            <div class="row">
                                <div class="col-sm-12" v-show="comments.length">
                                    <div class="text-center">
                                        <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="backsection">


            </div>

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

        <button class="btn btn-default btn-fixed btn-xl facebook" data-target="#comment-modal" data-toggle="modal">Deixe uma mensagem <i class="fa fa-comment"></i></button>

        <!-- MODAL FRASE FACEBOOK -->
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
                        <button type="button" class="btn btn-default m-b-10 btn-success btn-block" @click="openShareWhatsapp()"
                                :disabled="!interactions.whatsappPhraseSelected">Compartilhar no WhatsApp <i class="fa fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL BADGE HELP -->
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
                                <img src="../../../assets/images/star.png" alt="Este Drink é exclusivo"
                                     title="Este Drink é exclusivo">
                            </span>

                                <p>
                                    Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos eventos.</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/noiva.svg"
                                         alt="Este drink foi escolhido pela noiva"
                                         title="Este drink foi escolhido pela noiva">
                                </span>

                                <p>Os drinks com este ícone foram especialmente escolhidos pela
                                    noiva.</p>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                    <img src="../../../assets/images/preferido_do_noivo.svg"
                                         alt="Este drink foi escolhido pelo noivo"
                                         title="Este drink foi escolhido pelo noivo">
                                </span>

                                <p>Os drinks com este ícone foram especialmente escolhidos pelo
                                    noivo.</p>
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

        <!-- MODAL COMMENT -->
        <div class="modal fade" id="comment-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Enviar mensagem</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>Deixe aqui sua mensagem para o {{event.name}}.</p>

                        <div class="form-group">
                            <label>Primeiro Nome*</label>
                            <input class="form-control" v-model="newMessage.name" placeholder="Somente o primeiro nome">
                        </div>

                        <div class="form-group">
                            <label>Sobrenome*</label>
                            <input class="form-control" v-model="newMessage.last_name" placeholder="Sobrenome">
                        </div>

                        <div class="form-group">
                            <label>Email*</label>
                            <input class="form-control" v-model="newMessage.email">
                        </div>

                        <div class="form-group">
                            <label>Mensagem*</label>
                            <textarea class="form-control" v-model="newMessage.comment"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Quero receber novidades sobre a Mais Bartenders</label><br>
                            <label class="switch">
                              <input type="checkbox" v-model="newMessage.accept_mailling">
                              <div class="slider round"></div>
                            </label>
                        </div>

                        <button class="btn btn-primary btn-block facebook" @click="saveComment()" :disabled="!newMessage.comment || !newMessage.email || !newMessage.last_name || !newMessage.name">Deixar mensagem</button>

                    </div>

                </div>
            </div>
        </div>

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
                newMessage: {
                    event_id: '',
                    name: '',
                    last_name: '',
                    email: '',
                    comment: '',
                    accept_mailling: false,
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

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),

            eventBackground: function () {
                return `url('${ cordova.file.dataDirectory }/evento-${ this.event.url }.${ this.event.typeImg }')`
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

            getFormatedDates: function () {
                this.formatedDay = moment(this.event.date, 'DD/MM/YYYY').format('DD')
                this.formatedMonth = moment(this.event.date, 'DD/MM/YYYY').locale('pt-BR').format('MMM')
                this.formatedYear = moment(this.event.date, 'DD/MM/YYYY').format('YYYY')
            },

            checkRemainTime: function(){
                let that = this
                var then = that.event.date + ' ' +  that.event.time;

                if ( moment(then, 'DD/MM/YYYY HH:mm:ss').isBefore( moment() ) ) {
                    that.eventHasHappened = true
                } else {
                    setInterval( function(){
                        var then = that.event.date + that.event.time;
                        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment());
                        var d = moment.duration(ms);
                        that.remain.days = d.days();
                        that.remain.hours = d.hours();
                        that.remain.minutes = d.minutes();
                        that.remain.seconds = d.seconds();
                    }, 1000)
                }
            },

            systemUrlToGetDrinks: function (drink) {
                return `${ cordova.file.dataDirectory }/drink-${ drink.url }.${ drink.typeImg }`
            },

            openShareWhatsapp: function(){
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

            saveComment: function(){
                let that = this

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
                that.checkRemainTime();
            },

            showDrink: function(drink){
                let that = this

                localStorage.setItem('drink', JSON.stringify(drink));
                that.$router.push({name: 'landing.drinks.show-offline', params: {drink_slug: drink.url}});
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

            likeDrink(drink){
                let that = this

                let data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                if(that.userDrinkLikes.checkFromAttr('drink_id', drink.id)){
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

                        if(!that.userDrinkLikes.checkFromAttr('drink_id', drink.id)){
                            that.removeUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count - 1
                        } else {
                            that.addUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count + 1
                        }

                    });
            },

            handleLikedDrinks(drink_id){
                return this.userDrinkLikes.find(like => like.drink_id === drink_id) ? true : false
            },

            saveEvent: function(){
                let that = this

                var events = JSON.parse(localStorage.getItem('events'));

                if(Array.isArray(events) && events.length){

                    var index = events.indexFromAttr('id', that.event.id);

                    if(index > -1){
                        events[index] = that.event;
                    } else {
                        events.push(that.event);
                    }

                    var events = JSON.stringify(events);
                    localStorage.setItem('events', events);
                    successNotify('', 'Evento salvo no dispositivo.')

                } else {
                    var events = JSON.stringify([that.event]);
                    localStorage.setItem('events', events);
                    successNotify('', 'Evento salvo no dispositivo.')
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

                that.setLoading({is_loading: true, message: ''})
                that.currentCategory = category;
                that.applyCategoryFilter(category.slug_pt)

                setTimeout(function () {
                    that.interactions.is_loading = false;
                    that.interactions.finished_loading_category = true;
                    that.setSelectedCategory(category)
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
            }
        }
    }
</script>

<style scoped>

    /*Hashtag*/
    .hashtag .label.label-primary {
        font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
        background-color: #222;
        border-color: #222;
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
