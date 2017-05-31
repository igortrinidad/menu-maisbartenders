<template>
   <div class="page">

       <div id="most-recommended" class="container">
           <div class="text-center">
               <h2>Best Sellers</h2>
               <span>* Populares você me quebra viu auhhuauhuh Aqui eu pensei em exbir os que tiverem a prioridade > 4 (por exemplo) em destaque antes do usuario descer para filtrar por outros drinks.</span>
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
                         <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                         <div class="details">
                             <h3 class="drink-name">{{ drink.name }}</h3>
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
                drinkFetcheds: [],
                drinks: Drinks
            }
        },
        computed:{

            ...mapGetters(['currentUser', 'isLogged']),

            drinks: function(){
              return _.orderBy(this.drinkFetcheds, 'priority', 'desc');
            },

            especialDrinks: function(){
                return this.drinkFetcheds.map((drink) => drink.priority >=4 ? drink : undefined).filter((drink) => drink !== undefined)
            },
        },
        mounted(){
            this.initSwiper()
            // this.getDrinks()
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

            },

            // getDrinks: function(){
            //     let that = this
            //
            //     //that.$route.params.place_slug
            //
            //     that.$http.get('/drinks/fetchAll')
            //         .then(function (response) {
            //
            //             that.drinkFetcheds = response.data;
            //             that.initSwiper();
            //
            //         })
            //         .catch(function (error) {
            //             console.log(error)
            //             that.drinkFound = false;
            //             //that.$router.push({name: 'landing.404'})
            //         });
            //
            // },
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

/*.cols{
    padding: 10px;
    width: 100%;
    height: 470px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.col {
    width: 33.3333%;
    padding: 10px;
}*/

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
@media(max-width: 768px) {
    .cols{ column-count: 2; }
}

@media(max-width: 414px) {
    .cols{ column-count: 1; }
}

.drink{
    padding: 10px;
    border-radius: 4px;
    background: #eee;
    cursor: pointer;
    min-height: 150px;
}
.drink img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

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
