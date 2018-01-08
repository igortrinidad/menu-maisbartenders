<template>
    <div class="first-container show" ref="container">

        <main-header :title="eventFound ? event.name : 'Evento não encontrado'" />

        <!-- EventFound -->
        <div v-if="eventFound">
            <div class="show-header" v-bind:style="{ backgroundImage: eventBackground}">

                <span class="t-overflow" v-if="eventHasHappened">
                    {{ eventHasHappened ? 'Esse evento já passou :(' : event.hashtag }}
                </span>

            </div>

            <!-- Container Colored -->
            <div class="container-colored" style="margin-top: -10px">
                <div class="container">

                    <!-- Event Greeting & Share On Whatsapp -->
                    <div class="card m-b-10 text-center">
                        <div class="card-body card-padding">
                            <div v-html="event.greeting">
                            </div>

                            <button class="btn btn-block btn-mb-whatsapp m-t-20" data-toggle="modal" data-target="#modalShareWhatsApp">
                                Compartilhar no WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <span id="categories"></span>
            <span id="drinks"></span>
            <section  v-show="!interactions.finished_loading_category && !interactions.is_loading">
                <!-- CATEGORIES -->

                <h4 class="title-section">Categorias</h4>

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
                                        Os drinks que estão marcados com este ícone são drink exclusivos Mais
                                        Bartenders, criados e desenvolvidos por nossa equipe.</p>
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
                                        Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos
                                        eventos.</p>
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


            <div class="container-colored m-t-30 m-b-0 p-t-30">
                <div class="container">
                    <div class="card m-b-0">
                        <div class="card-body card-padding">
                            <div class="row">
                                <div class="col-md-12 col-xs-12">

                                    <div class="text-center">
                                        <h4 class="title-section m-0">Categorias</h4>
                                        <p class="sub-header">{{ pagination.total > 0 ? `${ pagination.total } comentários` :
                                            'Nenhum comentário ainda'}}</p>

                                        <p class="text-muted m-b-0 m-t-10">
                                            Deixe aqui seu comentário para o {{event.name}}
                                        </p>

                                        <button class="btn btn-mb-primary m-10" data-target="#modal-comment" data-toggle="modal"><i class="fa fa-comment"></i> Novo comentário</button>
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
                                                        <span class="comment-user-name">{{comment.guest.full_name}}</span>
                                                    </div>
                                                </div>
                                                <p class="m-t-10">{{comment.comment}}</p>
                                                <span
                                                    class="text-right comment-date">Criado em: {{comment.created_at | moment('DD/MM/YYYY HH:mm:ss')
                                                    }}</span>
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
                    </div>
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

        <!-- Modal commentário -->
        <div class="modal fade" id="modal-comment" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close text-primary" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Novo comentário</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>
                            Escreva seu comentário para o evento {{event.name}}</p>
                        <br>
                        <div class="form-group">
                            <label>Mensagem*</label>
                            <textarea class="form-control" v-model="newComment.comment" placeholder="Digite seu comentário"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-mb-primary m-b-10 btn-block"
                                @click="saveComment()"
                                :disabled="!newComment.comment"> Salvar comentário
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
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),
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

            saveComment: function () {
                let that = this

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

            resetComment(){
                let that = this
                that.newComment.comment = '';
                $('#modal-comment').modal('hide');
            }
        }
    }
</script>

<style scoped>

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
