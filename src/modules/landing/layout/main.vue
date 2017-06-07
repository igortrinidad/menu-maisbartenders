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
                location: null
            }
        },
        mounted(){
            this.location = window.location.href
        }
    }
</script>

<style>

/* back section */

.page{
    margin-top: 80px;
}

hr.gray{ border-color: #2c3e50; }

.btn-xl{
    font-weight: 700 !important;
    color: #2c3e50;
}

.btn-back i{ margin-right: 10px }

/* grid pinterest style */

.cols {
    width: 100%;
    column-count: 3;
    column-gap: 0;

}
.col {
    width: 100%;
    display: inline-block;
    padding: 5px;
}

.sub-header{
    font-weight: 500;
    text-transform: none;
    display: block;
    margin: 10px 5px 10px 5px;
}

@media(max-width: 768px) { .cols{ column-count: 2; } .cols.align-block .col{ width: 50%; } }
@media(max-width: 414px) { .cols{ column-count: 1; } .cols.align-block { display: grid;} .cols.align-block .col{ width: 100%; } }

/* Drinks */
.mb-drinks {
    margin: 40px 0;
}

.box{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    position: relative;
    width: 100%;
}
.box img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.badges + span{ cursor: pointer; }

.drink .description{
    display: block;
    max-width: 100%;
}

.drink-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.drink .stars { margin-right: 3px; }

/* Badges */

.badges{
    display: flex;
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: pointer;
}
.badge{
    width: 45px;
    height: 45px;
    border: 2px solid #fed136;
    display: flex;
    padding: 10px;
    background: rgba(44, 62, 80, .8);
    margin: 5px;
    border-radius: 50%;
}

.modal-badge.badge{ margin: 20px auto; }
.badge:hover{ transform: scale(1.05); }
.badge:active{ transform: scale(1.00); }
.badge img{ max-width: 100%; }
.badge img.zoom{ transform: scale(1.1); }

/* Tags */

.mb-tags{ margin: 20px 0; }
.tags{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
}
.tags .tag{
    margin: 5px 10px 5px 0;
    position: relative;
}

.tags .tag button {
    border: none;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    padding:10px 25px 10px 25px;
    color: rgba(255, 255, 255, .8);
    border-radius: 30px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    color: #2c3e50;
}
.tags .tag button.tag-selected,
.tags .tag button.button-tag { color: #fff; }

.tags .tag button.button-tag{ padding: 10px 35px 7px 25px ; }

.close-tag{
  position: absolute;
  font-size: 16px;
  right: 16px;
  top: 6px;
  font-weight: 400;
  opacity: 0;
}

.tags .tag button i {
    margin: 2.5px 0 0 10px;
    font-size: 10px;
}

.tags .tag button:focus{ outline: none; }

.button-tag{
  opacity: 0.8;
  background: #A6A19D;
  font-size: 12px;
  font-weight: 400;
  transition: background-color 0.3s ease;
}

.tag:hover{ transform: scale(1.05); }
.tag:active{ transform: scale(1.00); }
.tag-selected >.close-tag{ opacity: 1; }
.tag-selected{
  opacity: 1;
  background: #2C3E50;
}

/* Swiper Fix */
.swiper-container{ margin: 30px 0; }
.swiper-button-prev, .swiper-button-next{
    top: 50%;
    margin-top: -22px;
}

.swiper-button-prev{left: 3rem}
.swiper-button-next{right: 3rem}

.swiper-item-text{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2rem 3rem;
    background: rgba(0, 0, 0, .6);
    color: rgba(255, 255, 255, .8);

}

.swiper-image{
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.swiper-item-text .title{
    margin: 0 0 5px 0;
}
.swiper-item-text .subtitle{
    text-transform: uppercase;
    letter-spacing: 0px;
    max-width: 100%;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow:  hidden;
}
@media(max-width: 414px){
    .swiper-item-text{ padding: 2rem; }
    .swiper-item-text .subtitle{ display: none; }
}


.swiper-stars{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    padding: 3rem;
    color: #fed136;
    text-align: right;
}
.swiper-stars i{
    margin-right: 10px;
    font-size: 2rem;
    text-shadow: 1px 3px 3px rgba(0, 0, 0, .2);
}

/* Event */

.event-name{
    font-family: 'Lobster Two', cursive;
    text-transform: none;
    font-size: 30px;
}

.btn-primary{
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
            font-size: 12px;
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


.v-select input[type=search]{
    min-height: 45px;
    max-width: 50% !important;
    height: 45px;
    border: 1px solid #dce4ec;
    border-width: 2px;
    color: #2c3e50;
    border-radius: 4px;
}

.v-select .selected-tag {
    margin: 10px 5px 0 5px !important;
}

.v-select .dropdown-toggle {
    background: white !important;
}

.v-select.searchable .dropdown-toggle {
    min-height: 41px;
    border: 0px solid rgba(60,60,60,.0);
    border-width: 2px;
    color: #2c3e50;
    border-radius: 4px;
}

.v-select>.dropdown-toggle{
    border: 1px solid rgba(60,60,60,.26) !important;
}

.v-select.input-error>.dropdown-toggle {
    border: 1px solid rgba(244, 67, 54,.66) !important;
}

.v-select{
    margin: 0px 0px 0px 0px !important;
    min-height: 45px !important;
    border: 2px solid #dce4ec;
    color: #2c3e50;
    border-radius: 4px;
}

.dropdown.v-select.open{
    border-color: black;
}

.v-select.searchable .dropdown-toggle{border: none !important;}

.cursor-pointer{
    cursor:pointer;
}

.text-overflow{
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.drink-item{
  display: block;
}

</style>
