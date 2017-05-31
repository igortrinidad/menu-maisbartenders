<template>
   <div class="page">

       <div id="most-recommended" class="container">
           <div class="text-center">
               <h2>Best Sellers</h2>
               <span class="sub">Aqui está uma lista com as principais recomendações para você.</span>
           </div>
           <div class="swiper-row">
               <div class="swiper-container gallery-top" ref="swiper">
                   <div class="swiper-wrapper">

                       <div class="swiper-slide" v-for="(drink, index) in especialDrinks" key="index">
                           <img :src="drink.photo_url" :alt="drink.name" class="swiper-image" width="100%"/>
                           <span class="swiper-stars">
                               <i class="fa fa-star" v-for="n in drink.priority"></i>
                           </span>
                           <div class="swiper-item-text">
                               <h3 class="title">{{ drink.name }}</h3>
                               <span class="subtitle">{{ drink.description }}</span>
                           </div>
                       </div>
                   </div>

                   <div class="swiper-pagination"></div>
                   <!-- Add Arrows -->
                   <div class="swiper-button-next swiper-button-white"></div>
                   <div class="swiper-button-prev swiper-button-white"></div>
               </div>
           </div>
           <div class="text-center">
               <span class="sub">Ainda não decidiu? não se preocupe você pode ver todos os drinks e filtrar com os nossos ingredientes que você preferir</span>
               <a href="#drinks" class="page-scroll btn btn-xl m-t-3 all">Todos</a>
           </div>
       </div>

       <section id="drinks">
           <div class="container">
               <div class="filter">
                   <div class="text-center">
                       <h3>Ingredientes:</h3>
                       <span class="sub">Selecione os ingredientes de sua preferência.</span>
                   </div>

                   <div class="tags-list">
                       <div class="tags">
                           <div class="tag" v-for="tag in tags">
                               <button type="button">
                                   <span class="tag-name">{{ tag.name }}</span>
                                   <i class=" tag-icon fa fa-plus"></i>
                               </button>
                           </div>
                       </div>
                   </div>

                   <div class="tags-list" v-if="filterOptions.length">
                       <div class="tags">
                           <div class="tag">
                               <button type="button" @click="clearFilter()">
                                   <span class="tag-name">Exibir Todos</span>
                               </button>
                           </div>
                       </div>
                   </div>

               </div>
           </div>

           <div class="list-drinks">
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
                displayDrinks: true,
                drinkFetcheds: [],
                drinks: Drinks,
                filterOptions: ['Morango'],
                tags: [{id: 1, name: 'Morango', category: 'Fruta'}, {id: 1, name: 'Kiwi', category: 'Fruta'}],
                especialDrinks: Drinks.map((drink) => drink.priority === 5 ? drink : undefined).filter((drink) => drink !== undefined)
            }
        },
        computed:{

            ...mapGetters(['currentUser', 'isLogged']),

            drinks: function(){
              return _.orderBy(this.drinkFetcheds, 'priority', 'desc');
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

            clearFilter: function() {
                this.filterOptions = []
            }

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
/* Some Default Styles for page*/
.sub{
    font-weight: bold;
    text-transform: uppercase;
    display: block;
}

.btn-xl.all{
    font-weight: bold;
    margin: 20px 0;
    padding: 10px 20px;
    color: #2c3e50;
}

/* Page & Grid*/

.page{ margin-top: 80px; }

#most-recommended{ margin: 20px auto; }

#drinks{
    background-color: rgba(44, 60, 80, .07);
    padding: 80px 0;
}
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

@media(max-width: 768px) { .cols{ column-count: 2; } }
@media(max-width: 414px) { .cols{ column-count: 1; } }

/* Drinks & Drink Card */
.list-drinks {
    margin: 40px 0;
}

.drink{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
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

/* Filter */

.filter{
    /*padding: 0 10px;*/
}

.tags-list{
    margin: 20px 0;
}
.tags{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: left;
    justify-content: left;
}
.tags .tag{
    padding: 0 10px;
    position: relative;
}

.tags .tag button {
    background: #2c3e50;
    border: none;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    padding:8px 25px 10px 25px;
    color: rgba(255, 255, 255, .8);
    font-weight: bold;
    border-radius: 33px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    position: relative;
}

.tags .tag button i {
    margin: 2.5px 0 0 10px;
    font-size: 12px;
}
.tags .tag button.active { color: rgba(255, 255, 255, 1); }
.tags .tag button:focus{ outline: none; }

/* Swiper Fix */

.swiper-container{ margin: 30px 0; }
.swiper-button-prev, .swiper-button-next{
    top: 50%;
    margin-top: -22px;
}

.swiper-item-text{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 3rem;
    background: rgba(0, 0, 0, .6);
    color: rgba(255, 255, 255, .8);

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

.swiper-stars{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    padding: 3rem;
    color: #fed136;
}
.swiper-stars i{
    margin-right: 10px;
    font-size: 2rem;
    text-shadow: 1px 3px 3px rgba(0, 0, 0, .2);
}

</style>
