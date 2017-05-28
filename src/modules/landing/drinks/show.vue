<template>
   <div>

    <div v-if="drinkFound">
        <header id="header-drink" class="header-greeting" v-bind:style="{ backgroundImage: drinkBackground}">
            <div class="container" >
                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="intro-text">
                        <span class="text-box">
                            <span class="event-name">
                                {{drink.name}}
                            </span>
                        </span>
                        <br>
                        <a href="#drink" class="page-scroll btn btn-xl m-t-30">Ver detalhes</a>
                    </div>
                </div>
            </div>
        </header>

        <section id="drink">
            <div class="container">

                <div class="row">
                    <div class="text-right">
                        <button class="btn btn-default btn-sm m-b-10 btn-drink-action">Salvar drink</button>
                        <button class="btn btn-default btn-sm m-b-10 btn-drink-action facebook m-r-5" @click="interactions.drinkSelected = drink" data-toggle="modal" data-target="#modalSharePhrase">Compartilhar no facebook</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-center">

                        <h2 class="section-heading m-b-30">{{drink.name}}</h2>

                        <p class="m-t-30 text-muted">
                            <strong class="f-20">{{drink.description}}</strong><br>
                        </p>

                        <h3 class="m-b-30">Ingredientes</h3>

                        <p class="m-t-30 text-muted">
                            <span v-for="item in drink.items">
                                <strong class="f-20">{{item.name}}</strong><br>
                            </span>
                        </p>

                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="btn inline btn-xl m-t-30">
                        Ir para cardápio completo
                        </router-link>
                    </div>
                </div>
            </div>

        </section>
    </div>

        <div class="" v-if="!drinkFound">
            <header class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container" >
                    <div class="intro-text">
                        <div class="intro-heading">:(</div>
                        <div class="intro-heading">Não localizamos seu drink</div>
                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="btn btn-info ">
                        Ir para cardápio Mais Bartenders
                        </router-link>
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
                },
                drinkFound: true,
                drink: drinkObj,
                displayDrinks: false,
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),
            drinkBackground: function(){
                return 'url(' + this.drink.photo_url + ')';
            },

            phrases: function(){
                let that = this
            
                var phrases = [];

                var phrase1 =  `Keep calm e toma um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Quero muito um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 =  `Eu preciso de um drink ${that.drink.name} agora!`;
                phrases.push(phrase1);

                var phrase1 =  `Tudo que eu preciso é sombra e um ${that.drink.name}.`;
                phrases.push(phrase1);

                return phrases
                
            },

        },
        mounted(){
            var that = this

            this.getEvent();

            this.$nextTick(()=>{
                $('html, body').stop().animate({
                    scrollTop: $('#header-drink').offset().top
                }, 500, 'easeInOutExpo');
                that.initPageScroll()
            })
        },
        methods: {

            openShareFacebook: function(){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.drink.url}/${that.interactions.phraseSelected.replace(" ", "%20")}&picture=${that.drink.photo_url}&display=popup&mobile_iframe=true`;

                window.open(url,'_blank');

            },

            getEvent: function(){
                let that = this
                    
                //that.$route.params.place_slug

                that.$http.get('/drinks/show/' + that.$route.params.drink_slug)
                    .then(function (response) {
                        
                        that.drink = response.data;
                        that.drinkFound = true;

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
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            },

        }
    }
</script>

<style scoped>


</style>
