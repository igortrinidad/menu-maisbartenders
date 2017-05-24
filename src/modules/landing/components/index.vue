<template>
   <div class="container">

       <div class="text-center">

           <h1>Menu Bartenders - {{ mainEvent.name }}</h1>

           <p v-if="isLogged">Olá <strong>{{currentUser.name}}</strong>, bem vindo.</p>

           <router-link class="btn btn-success" to="/dashboard" v-if="isLogged">Go to Dashboard</router-link>
       </div>

       <div class="filter-step" v-for="items in itemsCategoriesOrdereds">
           <h3 class="title-filter">{{ items.label }}</h3>
           <div class="group-tags">
               <div class="tag-container" v-for="(item, index) in items.items">
                   <input :id="'frutas'+index" class="checkbox" type="checkbox" :value="item">
                   <label class="tag" @click="setCheckboxOnLabelClick('frutas'+index)">
                       <span>{{ item }}</span>
                   </label>
               </div>
           </div>
       </div>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Event from '../../../models/Event.js'
    import Tag from './Tag.vue'

    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {

                mainEvent: Event,
                drinks: Event.drinks,
                // items: Event.drinks.map((drink) => drink.items),
                itemsCategoriesOrdereds: {

                    fruitsAndIngredients: {
                        label: 'Frutas & Ingredientes',
                        items: this.getItemsByCategory('frutas')
                    },

                    drinks: {
                        label: 'Bedidas',
                        items: this.getItemsByCategory('bebidas')
                    },

                    presentations: {
                        label: 'Apresentações',
                        items: _.chain(Event.drinks)
                            .map((drink) => drink.presentation.toUpperCase())
                            .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                            ,[])
                            .value(),
                    },

                    styles: {
                        label: 'Estilos',
                        items: _.chain(Event.drinks)
                            .map((drink) => drink.style.toUpperCase())
                            .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                            ,[])
                            .value(),
                    }
                }
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            console.log()
        },
        methods: {

            setCheckboxOnLabelClick: function(id) {
                const el = document.getElementById(id)
                el.click()
            },

            getItemsByCategory: function(category) {
                return _.chain(Event.drinks)
                    .map((drink) => drink.items.map((item) => {
                        if(item.category.toLowerCase() === category) return item.name
                    }))
                    .flatten()
                    .filter((item) => item !== undefined)
                    .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                    ,[])
                    .value()
            },

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
    .tag {
        cursor: pointer;
        display: flex;
        background: #dedede;
        padding: 7px 14px;
        text-align: center;
        width: 100%;
        border-radius: 5px;
        text-transform: uppercase;
    }

    .checkbox{
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }

    .checkbox:checked + label {
        background: #4b2c50;
        color: #fff;
    }

    .group-tags{
        display: flex;
        flex-flow: row wrap;
        align-content: left;
        justify-content: left;
    }
    .title-filter{
        padding: 10px;
        text-transform: uppercase;
    }
    .tag-container{
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
