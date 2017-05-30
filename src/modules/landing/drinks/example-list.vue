<template>
   <div class="page">

       <header id="header-drinks" class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
           <div class="container" >
               <div class="col-md-6 col-md-offset-3 col-xs-12">
                   <div class="intro-text">
                       <span class="text-box">
                           <span class="event-name">
                               Cardápio Interativo Mais Bartenders
                           </span>
                       </span>
                       <br>
                       <a href="#drinks" class="page-scroll btn btn-xl m-t-30">Ver cardápio</a>
                   </div>
               </div>
           </div>
       </header>

       <div id="most-recommended" class="container">
           <div class="text-center">
               <h2>Populares</h2>
               <span>Aqui eu pensei em exbir os que tiverem a prioridade > 4 (por exemplo) em destaque antes do usuario descer para filtrar por outros drinks.</span>
           </div>
           <div class="swiper-row">
               <div class="swiper-container gallery-top" ref="swiper">
                   <div class="swiper-wrapper">

                       <div class="swiper-slide" v-for="(drink, index) in especialDrinks" key="index">

                           <img :src="drink.photo_url" :alt="drink.name" width="100%"/>
                       </div>
                   </div>

                   <div class="swiper-pagination"></div>
                   <!-- Add Arrows -->
                   <div class="swiper-button-next swiper-button-white"></div>
                   <div class="swiper-button-prev swiper-button-white"></div>
               </div>
           </div>
       </div>

       <section id="drinks">
           <div class="container">
               <div class="filter">
                   <h3>Ingredientes:</h3>
                   <span>OBS: Ao lado do switch "TODOS" a minha ideia é adicionar as opcoes de filtro, ingredientes, leve/forte, bedidas e ja ir filtrando ao "ligar" ou "desligar o filtro", tenho que procurar no commits, mas ja da pra fazer algo do tipo fácil com o que eu ja tinha feito.</span>
                   <div class="switch">
                       <label>
                           Todos
                           <button type="button" class="button-switch" @click="activeSwitch($event)"></button>
                       </label>
                   </div>
               </div>
           </div>

           <div class="container" v-if="displayDrinks">
               <div class="cols">
                   <div v-for="(drink, index) in drinks" class="col">
                       <div class="drink">
                           <img :src="drink.photo_url" :alt="drink.name">
                           <div class="details">
                               <h3 class="name">{{ drink.name }}</h3>
                               <i class="stars fa fa-star" v-for="n in drink.priority"></i>
                               <span class="description">{{ drink.description }}</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Drinks from '../../../models/DrinksExample.js'

    export default {
        name: 'show-drink',
        data () {
            return {
                displayDrinks: false,
                especialDrinks: Drinks.map((drink) => drink.priority >=4 ? drink : undefined)
                .filter((drink) => drink !== undefined),
                drinks: Drinks.sort((a, b) => {
                    if (a.priority < b.priority) return 1
                    if (a.priority > b.priority) return -1
                    return 0
                }),
            }
        },
        computed:{

            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            this.initSwiper()
        },

        methods: {

            activeSwitch: function() {
                this.displayDrinks = !this.displayDrinks

                //exemplo "porco" para simplificar o toggle do button-switch
                $('.button-switch').toggleClass('active')
            },

            initSwiper: function(){
                var that = this;

                setTimeout(function(){
                    var galleryTop = new Swiper(that.$refs.swiper, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 10,
                    });

                    galleryTop.update(true)

                }, 200)

            }
        }
    }
</script>

<style scoped>
.page{
    margin-top: 80px;
    min-height: 100vh;
}
#drinks{
    background-color: #f9f9f9;
    padding: 40px 0;
}
.cols{
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: space-between;
    width: 100%;
    align-items: bot;
}

.col{
    padding: 0 10px;
    width: 33.3333%;
    margin: 10px 0;
}

.drink{
    max-height: 300px;
    border: 1px solid #ecf0f1;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .1);
    background:#fff;
    cursor: pointer;
}
.drink img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.drink .description{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.drink .stars { margin-right: 3px; }

.filter{
    padding: 0 10px;
}

.switch{
    display: flex;
    height: 40px;
    width: 200px;
    align-items: center;
    cursor: pointer;
}

.switch label{
    cursor: pointer;
}

.button-switch{
    position: relative;
    top: 6px;
    width: 80px;
    height: 30px;
    border: none;
    background: #222222;
    border-radius: 5px
}

.button-switch.active:before{
    left: calc(100% - 40px);
    background: #eee;
    transition: ease .2s;
}

.button-switch:before{
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    width: 30px;
    height: 20px;
    background: #777;
    margin-top: -10px;
    transition: ease .2s;
    border-radius: 5px;
}

.button-switch:focus{
    outline: none;
}

#most-recommended{
    margin: 20px auto;
}

</style>
