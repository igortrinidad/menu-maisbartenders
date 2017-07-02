<template>
    <div>
        <div v-if="eventFound">
            <header id="header-event" class="header-greeting" v-bind:style="{ backgroundImage: eventBackground}">
                <div class="container">
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="intro-text">
                        <span class="text-box">
                            <span class="event-name" v-bind:style="{ color: event.title_hex}">
                                {{event.name}}
                            </span>
                        </span>
                            <br>
                            <span class="text-box">
                            <span class="event-greeting m-b-30" v-bind:style="{ color: event.title_hex}">
                                {{ event.greeting }}
                            </span>
                        </span>
                            <br>
                            <a href="#most-recommended" v-scroll-to="'#most-recommended'" class="btn btn-xl m-t-30">Escolher drinks</a>
                        </div>
                    </div>
                </div>
            </header>

            <div class="container m-t-20 text-center">
                <p>Sejam bem vindos ao <b>Menu Interativo Mais Bartenders</b> do(a) {{event.name}}.</p>
                <p>
                    Aqui você irá conferir o Menu de Drinks do evento e poder demonstrar um pouquinho da sua alegria e felicidade em participar dessa festa linda, compartilhando em seu Facebook um ou mais drinks que você gostaria de experimentar no evento.</p>
                <p>
                    Além de compartilhar com seus amigos os drinks que mais gostou, você pode salvar as receitas para pedir no dia do evento.</p>

                <p>Você pode enviar o link deste evento para seus amigos por WhatsApp através clicando abaixo:</p>

                <button class="btn btn-success" data-toggle="modal" data-target="#modalShareWhatsApp">Compartilhar evento por WhatsApp <i class="fa fa-whatsapp"></i></button>
            </div>

            <div id="most-recommended" class="container">
                <div class="text-center">
                    <h2>Best Sellers</h2>
                    <p class="sub-header">Aqui está uma lista com as principais recomendações para você.</p>
                </div>
                <div class="swiper-row">
                    <div class="swiper-container gallery-top" ref="swiper">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide" v-for="(drink, index) in especialDrinks" key="index">
                                <img :src="drink.photo_url" :alt="drink.name" class="swiper-image" width="100%"/>
                                <!--
                                <span class="swiper-stars">
                                    <i class="fa fa-star" v-for="n in drink.priority"></i>
                                </span>
                                -->
                                <div class="swiper-item-text">
                                    <h3 class="title">{{ drink.name }}</h3>
                                    <span class="subtitle">{{ drink.description }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="swiper-pagination"></div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next swiper-button-white"></div>
                        <div class="swiper-button-prev swiper-button-white"></div>
                    </div>
                </div>
                <div class="text-center">
                    <p class="sub-header">
                        Ainda não decidiu? Não se preocupe você pode ver todos o cardápio e filtrar os drinks com os ingredientes que preferir.</p>
                    <a v-scroll-to="'#drinks'" class="btn btn-primary btn-block m-t-10">Ver Todos</a>
                </div>
            </div>

            <section id="drinks">
                <div class="container">
                    <div class="filter">
                        <div class="text-center">
                            <h3>Ingredientes:</h3>
                            <p>Selecione os ingredientes de sua preferência.</p>
                        </div>

                        <div class="tags-list">
                            <div class="tags">
                                <div class="tag">
                                    <button
                                        type="button"
                                        :class="{'tag-selected': interactions.showTags}"
                                        @click="interactions.showTags = !interactions.showTags"
                                    >
                                        <span class="tag-name">Mostrar filtros</span>
                                    </button>
                                </div>
                                <div class="tag" v-if="interactions.showTags">
                                    <button type="button" :class="{'tag-selected': filterOptions.length}"
                                            @click="clearFilter()">
                                        <span class="tag-name">Limpar filtro</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="tags-list" v-if="interactions.showTags">
                            <div class="tags">
                                <div class="tag" v-for="tag in tags">
                                    <!-- aqui eu preciso adicionar uma tag fixa 'button tag' e uma outra para cada tipo de categoria, fruta ou bebida,nao sei e o o melhor jeito assim: -->
                                    <button
                                        class="button-tag"
                                        :class="{ 'tag-selected': filterOptions.indexOf(tag.name) > -1 }"
                                        type="button"
                                        @click="applyFilterOptions(tag.name, $event)"
                                    >{{ tag.name }}<span class="close-tag">x</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p class="m-l-5">
                            Localizamos {{drinksFiltered.length}} drinks em 0,{{Math.floor(Math.random() * 11)}}s</p>

                    </div>
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
                                        <img class="zoom" src="../../../assets/images/star.png"
                                             alt="Este drink está entre os BEST SELLERS"
                                             title="Este drink está entre os BEST SELLERS">
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

                                    <div class="items" v-if="isLogged" :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                        <span class="drink-item" v-for="(item, index) in drink.items" >
                                            <span v-show="item.pivot.is_visible">
                                                {{ item.name }}
                                            </span>
                                        </span>
                                    </div>

                                    <div class="items" :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
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

                                        <button
                                            class="btn btn-default m-b-10 btn-drink-action facebook btn-share btn-block"
                                            @click="interactions.drinkSelected = drink"
                                            data-toggle="modal"
                                            data-target="#modalSharePhrase"
                                        >Compartilhar no Facebook
                                        </button>

                                        <button @click.prevent="likeDrink(drink)" class="btn btn-sm m-b-10 btn-like btn-block">
                                            <span class="text-muted">{{drink.likes_count}}</span>
                                            <i class="fa fa-heart fa-lg text-danger" v-if="handleLikedDrinks(drink.id)"></i>
                                            <i class="fa fa-heart-o fa-lg text-danger" v-if="!handleLikedDrinks(drink.id)"></i>
                                        </button>
                                    </div>

                                    <div class="box-footer" v-if="!isLogged">
                                        <router-link
                                            tag="button"
                                            class="btn btn-default m-b-10 btn-block btn-drink-action facebook btn-share"
                                            :to="{name: 'landing.auth.login', query:{redirect: '/evento/' + $route.params.event_slug}}"
                                        >Faça login para salvar drink
                                        </router-link>

                                        <router-link
                                            tag="button"
                                            class="btn btn-default m-b-10 btn-block btn-drink-action facebook btn-share"
                                            :to="{name: 'landing.auth.login', query:{redirect: '/evento/' + $route.params.event_slug}}"
                                        >Faça login para compartilhar
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
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>


            <section id="comments">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-xs-12">

                            <h4 class="m-b-30">Comentários ({{pagination.total}})</h4>
                            <small>
                                Compartilhe um drink preferido e seus compartilhamentos serão exibidos aqui na página do {{event.name}}
                            </small>

                            <span v-for="(comment, index) in comments">
                                <div class="row">
                                    <span class="interactions m-10">
                                        <div class="row">
                                            <div class="col-md-1 col-xs-3">
                                                <img :src="handleGuestAvatar(comment.guest)" class="img-circle"
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

                            <div v-if="pagination.total > 0">
                                <pagination
                                    :source="pagination"
                                    @navigate="navigate"
                                    :paginator-class="'pagination-sm'"
                                >
                                </pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="backsection">
                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <router-link class="btn inline btn-xl m-t-30" :to="{ name: 'landing.events.list' }">
                                Voltar para lista eventos
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 col-xs-1 text-center m-t-10">
                        <button class="btn btn-primary" @click="saveEvent()">Salvar evento no dispositivo</button>
                    </div>
                </div>
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

        <!-- MODAL FRASE FACEBOOK -->
        <div class="modal fade" id="modalSharePhrase" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Escolha uma frase</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>
                            Escolha uma frase e compartilhe no Facebook a felicidade que você esta em participar dessa festa linda.</p>
                        <br>

                        <p class="phrase" v-for="(phrase, index) in phrases"
                           @click="interactions.phraseSelected = phrase"
                           :class="{'phraseSelected' : interactions.phraseSelected == phrase}">{{phrase}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default m-b-10 btn-drink-action facebook btn-share btn-block" @click="openShareFacebook()"
                                :disabled="!interactions.phraseSelected">Compartilhar no Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>

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
    </div>
</template>

<script>
    import Vue from 'vue'
    Vue.use(require('vue-moment'));
    import {mapGetters, mapActions} from 'vuex'
    import eventObj from '../../../models/Event.js'
    import drinkObj from '../../../models/Drink.js'

    var Swiper = require('swiper')

    export default {
        name: 'show-event',
        components: {
            pagination: require('@/components/pagination.vue')
        },
        data () {
            return {
                interactions: {
                    phraseSelected: '',
                    whatsappPhraseSelected: '',
                    drinkSelected: drinkObj,
                    showTags: false,
                    drinksToShowInfo: [],
                },
                filterOptions: [],
                eventFound: true,
                event: eventObj,
                itemsSelecteds: [],
                displayDrinks: false,
                comments: [],
                pagination: {}
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
                    return that.checkIfDrinkHasItem(drink)
                })

                if (arr.length) successNotify('', `Localizamos ${arr.length} drinks em 0,${Math.floor(Math.random() * 7) + 1  }s`);
                return arr;
            },

            tags: function () {
                let that = this

                var arr = [];

                that.event.drinks.map((drink) => {
                    drink.items.map((item) => {
                        if(item.pivot.is_visible){
                            if (arr.checkFromAttr('name', item.name)) {
                                return false
                            } else {
                                arr.push({name: item.name, category: item.category})
                            }  
                        }
                    });
                });

                return _.orderBy(arr, 'category', 'asc');

            },

            especialDrinks: function () {

                return this.event.drinks.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)
            },

            phrases: function () {
                let that = this

                var phrases = [];

                var phrase1 = `Keep calm e toma um ${that.interactions.drinkSelected.name} no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Não vejo a hora de chegar o ${that.event.name} para experimentar o drink ${that.interactions.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Vou tomar vários drinks ${that.interactions.drinkSelected.name} no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Ja tenho meu drink preferido no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `O ${that.interactions.drinkSelected.name} vai ser meu primeiro drink no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `O ${that.event.name} vai ser a melhor festa da vida!`;
                phrases.push(phrase1);

                var phrase1 = `Ninguém me segura no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Keep calm and drink a ${that.interactions.drinkSelected.name} no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `All i want is a ${that.interactions.drinkSelected.name} drink on ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 = `The ${that.event.name} gonna be incredible!`;
                phrases.push(phrase1);


                return phrases

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
            this.initSwiper();
        },

        filters: {
            addSpaceOnUrl: function (value) {
                let that = this
                return value;
            },
        },
        methods: {
            ...mapActions(['setLoading', 'addDrinkToSavedDrinks','addUserDrinkLike', 'removeUserDrinkLike']),

            openShareWhatsapp: function(){
                let that = this
            
                var url = `https://api.whatsapp.com/send?text=${that.interactions.whatsappPhraseSelected} Acesse o link: https://maisbartenders.com.br/opengraph/events/${that.event.url}`;

                window.open(url, '_system', null);
            },

            openShareFacebook: function () {
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=262783620860879&href=https://maisbartenders.com.br/opengraph/drinks/${that.interactions.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}/${that.event.url}&picture=${that.interactions.drinkSelected.photo_url}&display=popup&mobile_iframe=true&hashtag=${that.event.hashtag}`;

                    if(window.cordova){
                        
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) { 

                            var url = "https://www.facebook.com/dialog/return/close";

                            if (event.url.indexOf(url) !== -1) {
                                
                                ref.close();
                                successNotify('', 'Drink compartilhado com sucesso!')
                                $('#modalSharePhrase').modal('hide')
                                that.storeFacebookShare();

                            }
                        });

                    } else {
                        window.open(url, '_blank', 'location=yes');

                        setTimeout( function(){
                            successNotify('', 'Drink compartilhado com sucesso!')
                            $('#modalSharePhrase').modal('hide')
                            that.storeFacebookShare(); 
                        },1000)
                    }
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

            checkIfDrinkHasItem: function (drink) {

                if (!this.filterOptions.length) return true
                return (
                    _.chain(drink.items)
                        .map((i) => i.name)
                        .some(item => this.filterOptions.includes(item))
                        .value()
                )
            },

            applyFilterOptions: function (item, event) {
                const index = this.filterOptions.indexOf(item)

                if (index > -1) {
                    this.filterOptions.splice(index, 1)
                } else {
                    this.filterOptions.push(item)
                }
            },

            clearFilter: function () {
                this.filterOptions = []
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

            storeFacebookShare: function () {
                let that = this

                var data = {
                    event_id: that.event.id,
                    guest_id: that.currentUser.id,
                    comment: that.interactions.phraseSelected,
                }

                that.$http.post('/guest/eventComment', data)
                    .then(function (response) {

                        that.interactions.phraseSelected = ''
                        that.comments.unshift(response.data.comment)
                        that.pagination.total = that.pagination.total + 1
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

            initSwiper: function () {
                var that = this;

                setTimeout(function () {
                    var galleryTop = new Swiper(that.$refs.swiper, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 10,
                    });

                    galleryTop.update(true)

                }, 200)

            },

            getEvent: function () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/events/show/' + that.$route.params.event_slug)
                    .then(function (response) {

                        that.event = response.data;
                        that.eventFound = true
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

            handleGuestAvatar(guest){

                let guest_avatar = null

                if(guest.photo_url){
                    guest_avatar = guest.photo_url
                }

                if( guest.social_providers.length){
                    guest_avatar = guest.social_providers.find(provider => provider.provider === 'facebook').photo_url
                }

                return guest_avatar ? guest_avatar : '/static/assets/user_avatar.jpg'
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

                    that.$swal({
                      title: 'Informe uma senha deste dispositivo',
                      input: 'number',
                      showCancelButton: true,
                      confirmButtonText: 'Salvar',
                      showLoaderOnConfirm: true,
                      preConfirm: function (pass) {
                        return new Promise(function (resolve, reject) {

                          setTimeout(function() {
                            if (!pass) {
                              reject('Insira uma senha.')
                            } else {
                              resolve()
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

            saveNewEvent: function(){
                let that = this
            
                
            },
        }
    }
</script>

<style scoped>

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

</style>
