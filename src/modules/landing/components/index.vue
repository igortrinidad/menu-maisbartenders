<template>
   <div>
       <div class="full centered">
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

               <!-- Opções de filtro -->
               <div class="filter-step" v-for="items in itemsCategoriesOrdereds">
                   <h3 class="title-filter montserrat">{{ items.label }}</h3>
                   <div class="cols">
                       <div class="col" v-for="(item, index) in items.items">
                           <input :id="item+index" class="checkbox" type="checkbox" :value="item">
                           <label class="button tag" @click="setCheckboxOnLabelClick(item+index)">
                               <span>{{ item }}</span>
                           </label>
                       </div>
                   </div>
               </div>

               <!-- Escolhas do usuario -->
               <div class="choises" v-if="filter.length">
                   <div class="cols">
                       <div class="col">
                           <h3>Selecionados:
                               <span v-for="(item, index) in filter">{{ item }}<span v-if="index !== filter.length-1">, </span><span v-if="index === filter.length-1">.</span></span>
                           </h3>
                       </div>
                   </div>
                   <div class="cols">
                       <div class="col">
                           <button class="button inline margin" type="button" @click="displayFilteredDrinks()">Exbir drinks</button>
                           <button class="button inline" type="button" @click="displayFilteredDrinks()">Todos</button>
                       </div>
                   </div>
               </div>

               <!-- Drinks -->
               <div class="wrapper-drinks" v-if="displayDrinks">
                   <div class="cols" >
                       <div class="col">
                           <div class="drinks" >
                               <Carousel :perPage="1" :paginationActiveColor="'#222'" :paginationColor="'#777'">
                                   <Slide v-for="(drink, index) in drinks" v-if="" :key="index">
                                       <div class="drink">
                                           <span class="priority">
                                               <i class="fa fa-star" v-for="n in drink.priority"></i>
                                           </span>
                                           <img :src="drink.photo_url" :alt="drink.name" @click="modal()">
                                       </div>
                                   </Slide>
                               </Carousel>
                           </div>
                       </div>
                   </div>
               </div>

           </div>
       </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { Carousel, Slide } from 'vue-carousel'
    import Event from '../../../models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'landing',
        data () {
            return {

                mainEvent: Event,
                drinks: Event.drinks.sort((a, b) => {
                    if (a.priority < b.priority) return 1
                    if (a.priority > b.priority) return -1
                    return 0
                }),
                filter: [],
                displayDrinks: false,
                drinkPhotos: _.chain(Event.drinks)
                    .map((drink) => drink.photo_url)
                    .value(),
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

            modal: function() {
                alert('ampliar a imagem com outras informações')
            },

            displayFilteredDrinks: function() {
                this.displayDrinks = true;
            },

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
        },

        components: {
            'Carousel': Carousel,
            'Slide': Slide
        }

    }
</script>

<style scoped>

.background{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.main-title{
    margin: 0;
    color: #222;
    font-size: 3rem;
    font-weight: normal;
    margin-bottom: 20px
}

.button {
    background: #e5d647;
    color: #fff;
    box-shadow:3px 1px 1px rgba(0, 0, 0, .1);
}
.button:focus{ background:#4b2c50; }

.greeting {
    font-size: 1rem;
    font-style: italic;
    color: #222;
    background: rgba(255, 255, 255, .7);
    max-width: 320px;
    margin: 0 auto;
    display: block;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 3px 2px 2px rgba(0, 0, 0, 0.1);
}

.tag {
    font-size: 1rem;
    background: #dedede;
    color: #323232;
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

.title-filter{
    padding: 10px;
    text-transform: uppercase;
    color: #323232;
}

.button.inline{ display: inline; }
.button.inline.margin{ margin-right: 10px; }


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

.drinks{
    padding: 10px;
    background: #ededed;
    border-radius: 5px;
    box-shadow: 3px 2px 2px rgba(0, 0, 0, 0.1);
}

.drink {
    width: 100%
}

.drinks img{
    max-width: 250px;
    height: auto;
    max-height: 250px;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    cursor: pointer;
}

.priority{
    display: block;
}
.priority i {
    color: #4b2c50;
    margin: 0 5px;
}

</style>
