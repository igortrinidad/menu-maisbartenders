<template>
   <div>

    <div class="" v-if="drinkFound">
        <header class="header-greeting" v-bind:style="{ backgroundImage: drinkBackground}">
            <div class="container" >
                <div class="intro-text">
                    <div class="intro-lead-in"><strong>{{drink.name}}</strong></div>
                </div>
            </div>
        </header>

        <section id="items">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <p class="m-t-30 text-muted">
                            <strong class="f-20">{{drink.description}}</strong><br>
                        </p>

                        <h2 class="section-heading m-b-30">Ingredientes</h2>

                        <p class="m-t-30 text-muted">
                            <span v-for="item in drink.items">
                                <strong class="f-20">{{item.name}}</strong><br>
                            </span>
                        </p>

                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="btn inline btn-xl m-t-30">
                        Ir para cardápio Mais Bartenders completo
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

        },
        mounted(){
            var that = this

            this.getEvent();

            this.$nextTick(()=>{
                that.initPageScroll()
            })
        },
        methods: {

            openShareFacebook: function(drink){
                let that = this

                var url = 'https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/' + drink.id + '/Não%20vejo%20a%20hora%20de%20chegar%20o%20' + that.event.name + '%20para%20experimentar%20o%20drink%20' + drink.name + '!&picture=' + drink.photo_url + '&display=popup&mobile_iframe=true';

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
