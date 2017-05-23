<template>
   <div class="container">

       <div class="text-center">

           <h1>We Planner Vue Starter</h1>

           <p v-if="isLogged">Olá <strong>{{currentUser.name}}</strong>, bem vindo.</p>

           <router-link class="btn btn-success" to="/dashboard" v-if="isLogged">Go to Dashboard</router-link>
       </div>

       <div class="group-tags">
           <div class="tag" v-for="(item, index) in items" v-if="item[0].category === 'Frutas'">
               <Tag
                    v-bind:index="index"
                    v-bind:name="item[0].name"
                    v-bind:category="item[0].category"
               />
           </div>
       </div>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Event from '../../../models/Event.js'
    import Tag from './Tag.vue'


    console.log(Event)


    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {
                drinks: Event.drinks,
                items: Event.drinks.map((drink) => drink.items)
            }
        },
        computed:{
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        methods: {

            //Confirmar se deve ser rodado toda vez que a lista mudar...
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
        },
        components: {
            'Tag': Tag
        }
    }
</script>

<style scoped>
    .group-tags{
        display: flex;
        flex-flow: row wrap;
        align-content: left;
        justify-content: left;
    }
    .tag{
        padding: 10px;
    }
    .m-t-30{
        margin-top: 30px;
    }

    /*
    Swiper
    */
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

</style>
