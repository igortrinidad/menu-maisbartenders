<template>
   <div>

        <div class="" >
            <header class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container" >
                    <div class="intro-text">
                        <div class="intro-heading">Cardápio interativo Mais Bartenders</div>
                        <a href="#drinks" class="page-scroll btn btn-xl">Conheça os drinks Mais Bartenders</a>
                    </div>
                </div>
            </header>
        </div>

        <section id="drinks">
            <div class="container">

                <!-- Swiper -->
                <div class="swiper-row">
                    <div class="swiper-container gallery-top">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide " v-for="(drink, index) in drinks" key="index">
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
                                    <router-link
                                        :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}"
                                        class="btn btn-default m-b-20">
                                    Visualizar
                                    </router-link>
                                    <button class="btn btn-default m-b-20">Salvar drink</button>
                                    <button class="btn btn-default m-b-20 facebook" @click="openShareFacebook(drink)">Compartilhar no facebook</button>
                                </div>
                                
                                <img  to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}" class="drink-photo" :src="drink.photo_url" :alt="drink.name" width="100%"/>
                                
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

        </section>

        <div class="" v-if="!drinkFound">
            <header class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container" >
                    <div class="intro-text">
                        <div class="intro-heading">:(</div>
                        <div class="intro-heading">Não localizamos seu drink</div>
                        <a href="#items" class="page-scroll btn btn-xl">Conheça o cardápio Mais Bartenders</a>
                    </div>
                </div>
            </header>
        </div>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import drinkObj from '../../../models/Drink.js'

    export default {
        name: 'show-drink',
        data () {
            return {
                drinkFound: true,
                drinks: [],
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            this.getDrinks();


            $(function() {
                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            });
        },
        methods: {

            openShareFacebook: function(drink){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${drink.id}/Quero%20muito%20experimentar%o%20drink%20Drink%20${drink.name}.&display=popup&mobile_iframe=true`;

                window.open(url,'_blank');
            },

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

            getDrinks: function(){
                let that = this
                    
                //that.$route.params.place_slug

                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {
                        
                        that.drinks = response.data;
                        that.drinkFound = true;
                        that.initSwiper();

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.drinkFound = false;
                        //that.$router.push({name: 'landing.404'})
                    });
                
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

.swiper-button-prev, .swiper-button-next{
    bottom: 20%;
}

.priority{
    display: block;
}
.priority i {
    color: #4b2c50;
    margin: 0 5px;
}


</style>
