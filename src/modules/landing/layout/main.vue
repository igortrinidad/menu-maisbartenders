<template>
    <div>
        <main-loader></main-loader>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    // import appHeader from './partials/header.vue'
    // import appFooter from './partials/footer.vue'

    import mainLoader from '@/components/main-loader.vue'

    export default{
        name: 'landing-layout',
        components:{
            mainLoader
        },
        data(){
            return{
                location: null
            }
        },
        computed:{
            ...mapGetters(['isLogged'])
        },
        mounted() {
            this.location = window.location.href

            if(this.isLogged){
                this.getUserDrinkLikes()
            }
        },
        methods:{
            ...mapActions(['setUserDrinkLikes']),

            getUserDrinkLikes(){
                let that = this

                that.$http.get('/guest/drinkLikes')
                    .then(function (response) {

                        that.setUserDrinkLikes(response.data.likes)

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style>

@import '../../../../assets/css/general.css';
@import '../../../../assets/css/template_standart.css';

.btn-drink-action{
    font-weight: 700 !important;
    text-transform: uppercase;
    font-size: 10px !important;
    height: 32px;
    padding:8px 15px;
}

@media (max-width: 768px) {
    .text-center-mobile{
        text-align: center;
    }
}
@media (max-width: 768px) {
    .btn-drink-action{
        width: 100%;
        display: block !important;
    }
}

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
    height: calc(auto + 100px)
}
.box img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.badges + span{ cursor: pointer; }

.box .description{
    display: block;
    max-width: 100%;
}

.box .box-footer{
    border: 1px solid #f0f1f2;
    margin-top: 15px;
    border-radius: 4px;
    padding: 20px 30px 5px 30px;
}
.box .stars { margin-right: 3px; }

/* Default Drink */
.drink-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.drink .items{
    background: rgba(44, 60, 80, .07);
    border-radius: 4px;
    max-height: 0px;
    overflow: hidden;
    transition: .5s ease-out;
    padding: 0 10px;
}
.drink .items.show{
    max-height: 500px;
    transition: .5s ease-in;
}
.drink-item { margin: 5px 0 }
.drink-item i {
    color: #fed136;
    background: #2c3e50;
    border-radius: 50%;
    padding: 5px;
    font-size: 10px;
}

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
    color:#2C3E50;
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
        padding-top: 150px;
        padding-bottom: 100px;
    }
}
@media (max-width: 768px){

    header .intro-text {
        padding-top: 150px;
        padding-bottom: 50px;
    }
}

    .btn-fixed{
        position:fixed;
        bottom: 40px;
        left: 20px;
        z-index: 10;
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

        /*.btn-drink-action{
            font-size: 12px;
            padding: 5px;
        }*/

        .swiper-button-prev, .swiper-button-next{
            top: 50%;
        }
    }

    @media(min-width:769px){
            .swiper-button-prev, .swiper-button-next{
            top: 50%;
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
        height: 500px;
        text-align: center;
        background-attachment: scroll;
        background-position: center center;
        background-repeat: none;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
    }
    @media (max-width: 350px) {
        .header-greeting {
            height: 400px;
        }
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

.backsection{
    margin-bottom: 30px;
}


/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


/* END SWITCH */


</style>
