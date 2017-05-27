<template>
    <div>
        <app-header></app-header>

        <router-view></router-view>

    </div>
</template>

<script>
    import appHeader from './partials/header.vue'
    import { mapGetters } from 'vuex'

    export default{
        name: 'landing-layout',
        components:{
            appHeader
        },
        data(){
            return{

            }
        }
    }
</script>

<style>
    
    @media(max-width:768px){
        .btn{
            font-size: 13px;
            font-weight: 400;
        }

        .intro-heading{
            font-size: 14px;
            font-weight: 600;
        }

        .header-greeting{
            font-size: 14px;
            font-weight: 600;
        }

        header .intro-text .intro-heading{
            font-size: 20px;
        }

        .btn-drink-action{
            font-size: 12px;
            padding: 5px;
        }

        .swiper-button-prev, .swiper-button-next{
            top: 75%;
        }
    }

    @media(min-width:769px){
            .swiper-button-prev, .swiper-button-next{
            top: 65%;
        }
    }

    .drink-photo{
        max-height: 500px;
    }

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

    .stars{
        color: #fed136;
    }

    .drink-description{
        display: block;
        height: 100px;
        max-height: 100px;
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
