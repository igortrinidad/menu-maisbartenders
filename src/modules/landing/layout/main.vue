<template>
    <div>
        <main-loader></main-loader>

        <app-header></app-header>

        <router-view></router-view>

        <app-footer></app-footer>

    </div>
</template>

<script>
    import appHeader from './partials/header.vue'
    import appFooter from './partials/footer.vue'
    import mainLoader from '@/components/main-loader.vue'
    import { mapGetters } from 'vuex'

    export default{
        name: 'landing-layout',
        components:{
            appHeader,
            appFooter,
            mainLoader
        },
        data(){
            return{

            }
        }
    }
</script>

<style>

.event-name{
    font-family: 'Lobster Two', cursive;
    text-transform: none;
    font-size: 30px;
}

.btn-xl{
    color:#777777;
    font-weight: 500;
}

    .interactions{
        display: block;
        border-radius: 4px;
        background-color: #E5E5E5;
        padding: 5px 10px 5px 10px;
        font-size: 17px;
        font-weight: 500;
    }

.event-greeting{
    font-family: 'Lobster Two', cursive;
    font-size: 25px;
}

.text-box{
    padding: 20px !important;
    background-color: rgba(255,255,255,0.9);
    display: block;
}

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


@media (min-width: 768px){
    header .intro-text {
        padding-top: 200px;
        padding-bottom: 200px;
    }
}
@media (max-width: 768px){

    header .intro-text {
        padding-top: 100px;
        padding-bottom: 50px;
    }
}

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
            font-size: 11px;
            padding: 5px;
        }

        .swiper-button-prev, .swiper-button-next{
            top: 22%;
        }
    }

    @media(min-width:769px){
            .swiper-button-prev, .swiper-button-next{
            top: 33%;
        }
    }

    .text-description{
        color: #777777;
        font-size: 18px;
        line-height: 1.4;
        font-family: 'Lato', sans-serif;
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

    .drink-ingredients{
        display: block;
        height: 150px;
        max-height: 150px;
        font-size: 16px;
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
