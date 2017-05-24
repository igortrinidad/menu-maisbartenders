<template>
   <div>
       <div class="full">
           <div class="background"><img :src="mainEvent.event_photo_url" alt=""></div>
           <div class="container">
               <div class="text-center">
                   <h1 class="main-title text-center montserrat"><strong>Menu</strong> Bartenders</h1>

                   <p class="greeting montserrat" v-if="isLogged">Olá <strong>{{currentUser.name}}</strong>, {{ mainEvent.greeting }}.
                       <br> <small>{{ mainEvent.name }}</small>
                   </p>
               </div>

               <button class="button" type="button">Confira</button>

               <router-link class="btn btn-success" to="/dashboard" v-if="isLogged">Go to Dashboard</router-link>
           </div>
       </div>

       <div class="full">
           <div class="container">
               <div class="filter-step" v-for="items in itemsCategoriesOrdereds">
                   <h3 class="title-filter">{{ items.label }}</h3>
                   <div class="group-tags">
                       <div class="tag-container" v-for="(item, index) in items.items">
                           <input :id="item+index" class="checkbox" type="checkbox" :value="item">
                           <label class="tag" @click="setCheckboxOnLabelClick(item+index)">
                               <span>{{ item }}</span>
                           </label>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Event from '../../../models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {

                mainEvent: Event,
                drinks: Event.drinks,
                filter: [],
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
                if (!el.checked) {
                    el.click()
                    this.filter.push(el.value)
                    console.log(this.filter)
                } else {
                    el.click()
                    let post
                    this.filter.forEach((item, index) => {
                        if (item === el.value) {
                            post = index
                        }
                    })
                    this.filter.splice(post, 1)
                    console.log(this.filter)
                }
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
        }
    }
</script>

<style scoped>

@import "index.css";

</style>
