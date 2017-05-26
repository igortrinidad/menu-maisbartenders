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
                        Conheça o cardápio Mais Bartenders
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
            this.getEvent();
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
