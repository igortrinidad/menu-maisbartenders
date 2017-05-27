<template>
   <div>

    <div class="" v-if="eventFound">
        <header class="header-greeting" v-bind:style="{ backgroundImage: eventBackground}">
            <div class="container" >
                <div class="intro-text">
                    <div class="intro-lead-in"><strong class="distac">{{event.name}}</strong></div>
                    <div class="intro-lead-in distac f-700">{{ event.greeting }}</div>
                    <a href="#items" class="page-scroll btn btn-xl">Escolher drinks</a>
                </div>
            </div>
        </header>

        <section id="items">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2 class="section-heading m-b-30">Quais ingredientes você gostaria em seu drink?</h2>

                        <div v-for="category in itemsCategoriesOrdereds">
                            <h4 class="section-heading">{{category.label}}</h4>

                            <span v-for="item in category.items">
                                <button class="btn btn-filter inline tag" :class="{'btn-xl' : itemsSelecteds.indexOf(item) > -1}" @click="addItem(item)">
                                    {{ item }}
                                </button>
                            </span>

                            <br>
                            <br>
                        </div>

                        <p class="m-t-30 text-muted">
                            Clique em procurar para selecionarmos as melhores receitas para você.
                        </p>

                        <a href="#drinks" class="page-scroll btn inline btn-xl m-t-30" @click="displayDrinks = true">Procurar drinks</a>

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
                            <div class="swiper-container gallery-top">
                                <div class="swiper-wrapper">

                                    <div class="swiper-slide " v-for="(drink, index) in drinks" key="index">
                                        <h2 class="text-center">
                                            {{drink.name}}
                                        </h2>
                                        <h4 class="text-muted text-center  drink-description">{{drink.description}}</h4>
                                        <div class="text-center">
                                            <div class="row">
                                                <div class="col-md-12 col-xs-12 text-right">
                                                    <button class="btn btn-default m-b-20 btn-drink-action">Salvar drink</button>
                                                    <button class="btn btn-default m-b-20 btn-drink-action" data-toggle="modal" data-target="#modalSharePhrase" @click="interactions.drinkSelected = drink">Compartilhar no facebook</button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <img class="drink-photo" :src="drink.photo_url" :alt="drink.name" width="100%"/>
                                    </div>

                                </div>
                                <div class="swiper-pagination"></div>

                                <!-- Add Arrows -->
                                <div class="swiper-button-next swiper-button-white"></div>
                                <div class="swiper-button-prev swiper-button-white"></div>
                            </div>

                            <div class="swiper-container gallery-thumbs">
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
    </div>

    <div class="" v-if="!eventFound">
        <header class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
            <div class="container" >
                <div class="intro-text">
                    <div class="intro-heading">:(</div>
                    <div class="intro-heading">Não localizamos o evento informado</div>
                    <a href="#items" class="page-scroll btn btn-xl">Conheça o cardápio Mais Bartenders</a>
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

                that.initSwiper();
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

            this.getEvent();

            this.$nextTick(()=>{
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

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.interactions.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}&picture=${that.interactions.drinkSelected.photo_url}&display=popup&mobile_iframe=true`;

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

                setTimeout(function(){
                    var galleryTop = new Swiper('.gallery-top', {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 10,
                    });
                    var galleryThumbs = new Swiper('.gallery-thumbs', {
                        spaceBetween: 10,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        touchRatio: 0.2,
                        slideToClickedSlide: true
                    });

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

.phrase{
    display: block;
    border-radius: 4px;
    background-color: #E5E5E5;
    padding: 5px 10px 5px 10px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
}

.phrase:hover{
        -webkit-box-shadow: 3px 3px 15px rgba(0,0,0,0.2);
    -moz-box-shadow: 3px 3px 15px rgba(0,0,0,0.2);
    box-shadow: 3px 3px 15px rgba(0,0,0,0.2);
}

.phraseSelected{
    background-color: #FED136;
}

</style>
