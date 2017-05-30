<template>
   <div>

        <div>
            <header id="header-drinks" class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container" >
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="intro-text">
                            <span class="text-box">
                                <span class="event-name">
                                    Cardápio Interativo Mais Bartenders
                                </span>
                            </span>
                            <br>
                            <a href="#drinks" class="page-scroll btn btn-xl m-t-30">Ver cardápio</a>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <section id="drinks">
            <div class="container">

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
                                    <button class="btn btn-default btn-sm m-b-10 btn-drink-action" @click="addDrinkPreference(drink)">Salvar drink</button>
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
                    
                </div> 

            </div>

        </section>

        <!-- Galeria de drinks -->
        <section id="all-drinks">
            <h3 class="m-b-10 text-center">Confira outros drinks</h3>
                <div class="row">

                    <div class="col-md-3 col-xs-6" v-for="(drink, index) in drinks">
                        <img :src="drink.photo_url" :alt="drink.name" width="90%"/>
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

        <div class="modal fade" id="modalSharePhrase" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Escolha uma frase</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>Escolha uma frase e compartilhe o drink em seu Facebook.</p>
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
    import drinkObj from '../../../models/Drink.js'

    export default {
        name: 'show-drink',
        data () {
            return {
                interactions: {
                    phraseSelected: '',
                    drinkSelected: drinkObj,
                },
                drinkFound: true,
                drinks: [],
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

            phrases: function(){
                let that = this
            
                var phrases = [];

                var phrase1 =  `Keep calm e toma um ${that.interactions.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Quero muito um ${that.interactions.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Eu preciso de um drink ${that.interactions.drinkSelected.name} agora!`;
                phrases.push(phrase1);

                var phrase1 =  `Tudo que eu preciso é sombra e um ${that.interactions.drinkSelected.name}.`;
                phrases.push(phrase1);

                return phrases
                
            },

        },
        mounted(){
            var that = this
            this.getDrinks();

            this.$nextTick(()=>{
                $('html, body').stop().animate({
                    scrollTop: $('#header-drinks').offset().top
                }, 1500, 'easeInOutExpo');
                that.initPageScroll()
            })
        },
        methods: {

            openShareFacebook: function(){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.interactions.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}/123123&picture=${that.interactions.drinkSelected.photo_url}&display=popup&mobile_iframe=true`;

                window.open(url,'_blank');

                that.storeFacebookShare();

            },

            addDrinkPreference: function(drink){
                let that = this
            
                var data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                that.$http.post('/guest/addDrinkPreference', data)
                    .then(function (response) {

                        successNotify('', 'Drink salvo com sucesso!')

                    })
                    .catch(function (error) {
                        console.log(error)
                        errorNotify('Ops!', 'Ocorreu um erro ao salvar seu drink!')
                    });
                
            },

            storeFacebookShare: function(drink){
                let that = this
            
                var data = {
                    message: that.interactions.phraseSelected,
                    user_id: 123
                }

                that.$http.post('/usert/storeFacebookShare', data)
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                
            },

            initSwiper: function(){
                var that = this;

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

                    galleryTop.params.control = galleryThumbs;
                    galleryThumbs.params.control = galleryTop;

                    galleryThumbs.update(true)
                    galleryTop.update(true)

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

            initPageScroll: function(){
                let that = this
            
                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 500, 'easeInOutExpo');
                    event.preventDefault();
                });
            },
        }
    }
</script>

<style scoped>

</style>
