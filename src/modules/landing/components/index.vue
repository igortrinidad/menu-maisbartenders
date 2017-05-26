<template>
   <div>

        <header class="header-greeting" v-bind:style="{ backgroundImage: bg}">
            <div class="container" >
                <div class="intro-text">
                    <div class="intro-lead-in">Olá <strong>{{currentUser.name}}</strong></div>
                    <div class="intro-heading">{{ mainEvent.greeting }}</div>
                    <a href="#items" class="page-scroll btn btn-xl">Escolham seus drinks preferidos</a>
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

                <!-- Swiper -->
                <div class="swiper-row">
                    <div class="swiper-container gallery-top">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide " v-for="(drink, index) in drinks" v-if="applyFilter(drink) && displayDrinks" :key="index">
                                <h4 class="text-center stars">
                                    <span class="">
                                        <i class="fa fa-star fa-2x" v-for="n in drink.priority"></i>
                                    </span>
                                </h4>
                                <h2 class="text-center">
                                    {{drink.name}}
                                </h2>
                                <h4 class="text-muted text-center  drink-desc">{{drink.description}}</h4>
                                <div class="text-center">
                                    <button class="btn btn-default m-b-20">Salvar drink</button>
                                    <button class="btn btn-default m-b-20" @click="openShareFacebook(drink)">Compartilhar no facebook</button>
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
                            <div class="swiper-slide" v-for="(drink, index) in drinks" v-if="applyFilter(drink) && displayDrinks" :key="index">
                                <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
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
</template>

<script>
    import { mapGetters } from 'vuex'
    import Event from '../../../models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {
                bg: 'url(../../../../static/assets/header-bg.jpg)',
                mainEvent: Event,
                drinks: Event.drinks.sort((a, b) => {
                    if (a.priority < b.priority) return 1
                    if (a.priority > b.priority) return -1
                    return 0
                }),
                itemsSelecteds: [],
                displayDrinks: false,
                drinkPhotos: _.chain(Event.drinks)
                    .map((drink) => drink.photo_url)
                    .value(),
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

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
                            label: 'Apresentações',
                            items: _.chain(Event.drinks)
                                .map((drink) => drink.presentation.toUpperCase())
                                .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                                ,[])
                                .value(),
                        },

                        styles: {
                            label: 'Estilos',
                            items: _.chain(Event.drinks)
                                .map((drink) => drink.style.toUpperCase())
                                .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                                ,[])
                                .value(),
                        }
                    }
            },

        },
        mounted(){
        },
        methods: {

            openShareFacebook: function(drink){
                let that = this

                var url = 'https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/' + drink.id + '/Não%20vejo%20a%20hora%20de%20chegar%20o%20' + that.mainEvent.name + '%20para%20experimentar%20o%20drink%20' + drink.name + '!&picture=' + drink.photo_url + '&display=popup&mobile_iframe=true';

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
                return _.chain(Event.drinks)
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
        }
    }
</script>

<style scoped>

.header-greeting{
    text-align: center;
    background-attachment: scroll;
    background-position: center center;
    background-repeat: none;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}

header .intro-text .intro-heading{
    font-size: 40px;
}

.swiper-row{
    margin: 50px;
}
.btn.tag:hover,
.btn.tag:focus{color:#2c3e50;}

.btn.btn-xl.tag:hover,
.btn.btn-xl.tag:focus{color:#fff;}


.tag {
    font-size: 1.4rem;
    margin: 7px;
}

.stars{
    color: #fed136;
}

.drink-desc{
    display: block;
    height: 60px;
}


.drink-photo{
  max-height: 350px
}

/* Swiper */

.gallery-top {
    height: 80%;
    width: 100%;
}
.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
    width: 200px;
    height: 100px;
    opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
    opacity: 1;
}

.priority{
    display: block;
}
.priority i {
    color: #4b2c50;
    margin: 0 5px;
}

</style>
