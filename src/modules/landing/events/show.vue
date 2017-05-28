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
                        <a href="#items" class="page-scroll btn btn-xl m-t-30">Escolher drinks</a>
                    </div>
                </div>
            </div>
        </header>

        <section id="items">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h3 class="section-heading m-b-30">Como você quer seu coquetel?</h3>

                        <div v-for="category in itemsCategoriesOrdereds">
                            <h4 class="section-heading">{{category.label}}</h4>

                            <span v-for="item in category.items">
                                <button class="btn btn-default btn-sm m-5" :class="{'btn-primary' : itemsSelecteds.indexOf(item) > -1}" @click="addItem(item)">
                                    {{ item }}
                                </button>
                            </span>

                            <br>
                            <br>
                        </div>

                        <p class="m-t-5 text-muted">
                            Clique em procurar para selecionarmos as melhores receitas para você.
                        </p>

                        <a href="#drinks" class="page-scroll btn inline btn-xl m-t-10" @click="displayDrinks = true">Procurar drinks</a>

                    </div>
                </div>
            </div>
        </section>

        <section id="drinks">
            <div class="container">

                <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <!-- Swiper -->
                        <div class="swiper-row">
                            <div class="swiper-container gallery-top" ref="swiper">
                                <div class="swiper-wrapper">

                                    <div class="swiper-slide" v-for="(drink, index) in drinks" key="index">

                                        <div class="text-right">
                                            <router-link
                                                :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}"
                                                class="btn btn-default btn-sm m-b-10 btn-drink-action">
                                            Visualizar
                                            </router-link>
                                            <button class="btn btn-default btn-sm m-b-10 btn-drink-action">Salvar drink</button>
                                            <button class="btn btn-default btn-sm m-b-10 btn-drink-action facebook  m-r-5" @click="interactions.drinkSelected = drink" data-toggle="modal" data-target="#modalSharePhrase">Compartilhar no facebook</button>
                                        </div>
                                    
                                        <img :src="drink.photo_url" :alt="drink.name" width="100%"/>

                                        <div class="text-center">
                                            <h2 class="section-heading m-b-30">{{drink.name}}</h2>
                                            <p class="m-t-30 text-muted">
                                                <strong class="f-20">{{drink.description}}</strong><br>
                                            </p>
                                            <h3 class="m-b-10">Ingredientes</h3>
                                            <p class="m-t-10 text-muted drink-ingredients">
                                                <span v-for="item in drink.items">
                                                    <strong>{{item.name}}</strong><br>
                                                </span>
                                            </p>
                                        </div>
                                
                                    </div>
                                </div>

                                <div class="swiper-pagination"></div>
                                <!-- Add Arrows -->
                                <div class="swiper-button-next swiper-button-white"></div>
                                <div class="swiper-button-prev swiper-button-white"></div>
                            </div>
                            
                             <h3 class="m-b-10 text-center">Confira outras opções com os itens selecionados</h3>
                        
                            <div class="swiper-container gallery-thumbs" ref="swiperthumbs">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(drink, index) in drinks">
                                        <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>


            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <a href="#drinks" class="page-scroll btn inline btn-xl m-t-30" @click="clearFilter()" v-if="displayDrinks">Mostrar todos</a>

                    </div>
                </div>
            </div>
        </section>

        <section id="comments">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-xs-12">

                        <h2>Comentários</h2>
                        <small>Compartilhe um drink preferido e seus compartilhamentos serão exibidos aqui na página do {{event.name}}</small>

                        <span v-for="(comment, index) in event.comments">
                        <div class="row">

                            <span class="interactions m-10">
                                <div class="row">
                                    <div class="col-md-1 col-xs-3">
                                        <img src="http://bootdey.com/img/Content/avatar/avatar6.png" class="img-circle" width="60px">
                                    </div>
                                    <div class="col-md-11 col-xs-9">
                                        <br>
                                        <span class="comment-user-name">{{comment.user.name}}</span>
                                    </div>
                                </div>
                                <p class="m-t-10">{{comment.phrase}}</p>
                                <span class="text-right comment-date">Criado em: {{comment.created_at}}</span>
                            </span>
                            
                        </div>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="" v-if="!eventFound">
        <header id="header-drink" class="header-greeting">
            <div class="container" >
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Escolha uma frase</h4>
                </div>
                <div class="modal-body p-25">

                    <p>Escolha uma frase e compartilhe a felicidade que você esta em participar dessa festa linda.</p>
                    <br>

                    <p class="phrase" v-for="(phrase, index) in phrases" @click="interactions.phraseSelected = phrase" 
                    :class="{'phraseSelected' : interactions.phraseSelected == phrase}">{{phrase}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="openShareFacebook()" :disabled="!interactions.phraseSelected">Compartilhar no facebook</button>
                </div>
            </div>
        </div>
    </div>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventObj from '../../../models/Event.js'
    import drinkObj from '../../../models/Drink.js'

    var Swiper = require('swiper')

    export default {
        name: 'show-event',
        data () {
            return {
                interactions: {
                    phraseSelected: '',
                    drinkSelected: drinkObj,
                },
                eventFound: true,
                event: eventObj,
                itemsSelecteds: [],
                displayDrinks: false,
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),
            eventBackground: function(){
                return 'url(' + this.event.photo_url + ')';
            },
            itemsCategoriesOrdereds: function(){
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

            drinks: function(){
                var that = this
                var drinks_filtereds = that.event.drinks.filter( function(drink){
                    return that.applyFilter(drink)
                })

                return _.orderBy(drinks_filtereds, 'priority', 'desc');
            },

            phrases: function(){
                let that = this
            
                var phrases = [];

                var phrase1 =  `Keep calm e toma um ${that.interactions.drinkSelected.name} no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Não vejo a hora de chegar o ${that.event.name} para experimentar o drink ${that.interactions.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Vou tomar vários drinks ${that.interactions.drinkSelected.name} no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Ja tenho meu drink preferido no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `O ${that.interactions.drinkSelected.name} vai ser meu primeiro drink no ${that.event.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `O ${that.event.name} vai ser a melhor festa da vida!`;
                phrases.push(phrase1);

                var phrase1 =  `Ninguém me segura no ${that.event.name}!`;
                phrases.push(phrase1);

                return phrases
                
            },

        },
        mounted(){
            var that = this

            //this.getEvent();

            this.$nextTick(()=>{
                $('html, body').stop().animate({
                    scrollTop: $('#header-event').offset().top
                }, 500, 'easeInOutExpo');
                that.initPageScroll()
            })
        },

        filters: {
            addSpaceOnUrl: function(value){
                let that = this
                return value;
            },
        },
        methods: {

            openShareFacebook: function(){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.interactions.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}${that.event.hashtag}&picture=${that.interactions.drinkSelected.photo_url}&display=popup&mobile_iframe=true&hashtag=${that.event.hashtag}`;

                window.open(url,'_blank');

            },

            addItem: function(item){
                let that = this

                var index = this.itemsSelecteds.indexOf(item);
                if(index > -1){
                    this.itemsSelecteds.splice(index,1)
                } else {
                    this.itemsSelecteds.push(item)
                }
                if (!this.itemsSelecteds.length) {
                    this.displayDrinks = false
                }

                that.initSwiper();
            },

            applyFilter: function(drink) {
                this.initSwiper()
                if (!this.itemsSelecteds.length) return true
                return (
                    _.chain(drink.items)
                    .map((i) => i.name)
                    .some(item => this.itemsSelecteds.includes(item))
                    .value()
                )
            },

            clearFilter: function() {
                this.itemsSelecteds = []
            },

            getItemsByCategory: function(category) {
                var that = this
                return _.chain(that.event.drinks)
                    .map((drink) => drink.items.map((item) => {
                        if(item.category.toLowerCase() === category) return item.name
                    }))
                    .flatten()
                    .filter((item) => item !== undefined)
                    .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                    ,[])
                    .value()
            },

            // must be called when drink filter is applied in applyFilter method for exemple
            initSwiper: function(){
                var that = this

                setTimeout(function(){
                    var galleryTop = new Swiper(that.$refs.swiper, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 10,
                    });
                    var galleryThumbs = new Swiper(that.$refs.swiperthumbs, {
                        spaceBetween: 10,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        touchRatio: 0.2,
                        slideToClickedSlide: true
                    });

                    galleryThumbs.update(true)
                    galleryTop.update(true)

                    galleryTop.params.control = galleryThumbs;
                    galleryThumbs.params.control = galleryTop;

                }, 200)

            },

            getEvent: function(){
                let that = this
                    
                //that.$route.params.place_slug

                that.$http.get('/events/show/' + that.$route.params.event_slug)
                    .then(function (response) {

                        that.event = response.data;
                        that.eventFound = true

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.eventFound = false;
                    });
                
            },

            initPageScroll: function(){
                let that = this
            
                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            },
        }
    }
</script>

<style scoped>

/* END SWIPER */

.btn-tag{
    background-color: #C0C0C0;
    color: #2C3E50;
}


.comment-date{
    font-weight: 400;
    margin-top: -80px;
    font-size: 12px;
}

</style>
