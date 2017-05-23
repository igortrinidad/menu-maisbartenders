<template>
   <div class="container">

       <div class="main text-center">

           <img src="static/assets/logo.png" width="120">
           <h1 class="">We Planner Vue Starter</h1>

           <p v-if="isLogged">Olá <strong>{{currentUser.name}}</strong>, bem vindo.</p>


           <!-- Swiper -->
            <div>
                <div class="swiper-container gallery-top">
                    <div class="swiper-wrapper">
                        <!-- Alterar objetos -->
                        <div class="swiper-slide" v-for="photo in service.photos">
                            <img :src="photo.photo_url" width="100%"/>
                        </div>

                    </div>
                    <div class="swiper-pagination"></div>

                    <!-- Add Arrows -->
                    <div class="swiper-button-next swiper-button-white"></div>
                    <div class="swiper-button-prev swiper-button-white"></div>
                </div>

                <div class="swiper-container gallery-thumbs">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="photo in service.photos">
                            <img :src="photo.photo_url" width="100%"/>
                        </div>
                    </div>
                </div>
            </div>

           <router-link class="btn btn-success" to="/dashboard" v-if="isLogged">Go to Dashboard</router-link>
       </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {

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
        }
    }
</script>

<style scoped>
    .main {
        position: absolute;
        width: 500px;
        height: 300px;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -250px;
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


