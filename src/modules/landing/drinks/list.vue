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

                       </div>
                   </div>

                   <div class="tags-list">
                       <div class="tags">
                          <div class="tag">
                               <button type="button" :class="{'tag-selected': interactions.showTags}" @click="interactions.showTags = !interactions.showTags">
                                   <span class="tag-name">Mostrar filtros</span>
                               </button>
                           </div>
                           <div class="tag" v-if="interactions.showTags">
                               <button type="button" :class="{'tag-selected': filterOptions.length}" @click="clearFilter()">
                                   <span class="tag-name">Limpar filtro</span>
                               </button>
                           </div>
                       </div>
                   </div>

                   <div class="tags-list" v-if="interactions.showTags">
                       <div class="tags">
                           <div class="tag" v-for="tag in tags">
                                <!-- aqui eu preciso adicionar uma tag fixa 'button tag' e uma outra para cada tipo de categoria, fruta ou bebida,nao sei e o o melhor jeito assim: -->
                                <button
                                    class="button-tag"
                                    :class="{ 'tag-selected': filterOptions.indexOf(tag.name) > -1 }"
                                    type="button"
                                    @click="applyFilterOptions(tag.name, $event)"
                                >
                                   {{ tag.name }}
                                   <span class="close-tag">x</span>
                                </button>
                           </div>
                       </div>
                   </div>

                   <h5 class="m-l-5">Localizamos {{drinksFiltered.length}} drinks em 0,{{Math.floor(Math.random() * 11)}}s</h5>



               </div>
           </div>

           <div class="list-drinks">
               <div class="container">
                   <div class="cols" :class="{ 'align-block': drinksFiltered.length === 2 }">
                       <div v-for="(drink, index) in drinksFiltered" class="col">
                           <div tag="div" class="drink" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                               <div class="badges">
                                   <span class="badge" v-if="drink.is_exclusive" data-toggle="modal" data-target="#badge-help">
                                       <img :src="exclusiveBadge" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                                   </span>
                                   <span class="badge" v-if="drink.priority >= 4" data-toggle="modal" data-target="#badge-help">
                                       <img class="zoom" :src="starBadge" alt="Este drink está entre os BEST SELLERS" title="Este drink está entre os BEST SELLERS">
                                   </span>
                               </div>

                               <router-link tag="span" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                                <div class="details">
                                    <h3 class="drink-name">{{ drink.name }}</h3>
                                    <!-- <i class="stars fa fa-star" v-for="n in drink.priority"></i> -->
                                    <span class="description">{{ drink.description }}</span>
                                    <div class="items">
                                        <span class="item" v-for="(item, index) in drink.items">{{ item.name }}</span>
                                    </div>
                                </div>

                               </router-link >
                            </div>
                        </div>
                   </div>
               </div>
           </div>
       </section>

       <div class="modal fade" id="badge-help" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Ícones nos drinks</h4>
                    </div>
                    <div class="modal-body p-25 text-center">

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img :src="exclusiveBadge" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               </span>

                               <p>Este ícone é referente a drinks exclusivos Mais Bartenders, são criações autorais desenvolvidas por nossa equipe.</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img :src="starBadge" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               </span>

                               <p>Este ícone é referente a drinks exclusivos Mais Bartenders, são criações autorais desenvolvidas por nossa equipe.</p>
                            </div>
                        </div>


                        <br>



                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-primary">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'list-drink',
        data () {
            return {
                interactions: {
                    showTags: false
              },
              drinkFetcheds: [],
              especialDrinks: [],
              filterOptions: [],
              exclusiveBadge: '../../../../static/assets/king.png',
              starBadge: '../../../../static/assets/star.png',
            }
        },
        computed:{

            ...mapGetters(['currentUser', 'isLogged']),

            drinks: function(){
                return _.orderBy(this.drinkFetcheds, 'priority', 'desc');
            },

            drinksFiltered: function(){
                var that = this
                var arr =  this.drinks.filter( function(drink){
                    return that.checkIfDrinkHasItem(drink)
                })

                if(arr.length) successNotify('', `Localizamos ${arr.length} drinks em 0,${Math.floor(Math.random() * 7) + 1  }s`);
                return arr;
            },

            showDrinksFindedNotification: function(){
                let that = this


            },
            tags: function(){
                let that = this

                var arr = [];

                that.drinks.map((drink) => {
                    drink.items.map((item) => {
                        if(arr.checkFromAttr('name', item.name)){
                            return false
                        } else {
                            arr.push({name: item.name, category: item.category})
                        }
                    });
                });

                return _.orderBy(arr, 'category', 'asc');

            },
        },
        mounted(){
            this.initSwiper()
            this.getDrinks()
        },

        methods: {

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

            checkIfDrinkHasItem: function(drink) {

                if (!this.filterOptions.length) return true
                return (
                    _.chain(drink.items)
                    .map((i) => i.name)
                    .some(item => this.filterOptions.includes(item))
                    .value()
                )
            },

            applyFilterOptions: function(item, event) {
                const index = this.filterOptions.indexOf(item)

                if(index > -1){
                  this.filterOptions.splice(index,1)
                } else {
                  this.filterOptions.push(item)
                }
            },

            clearFilter: function() {
                this.filterOptions = []
                this.drinksFiltered = this.drinks.map((drink) => true)
            },

            getDrinks: function(){
                let that = this

                //that.$route.params.place_slug

                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {

                        // Lista de drinks
                        that.drinkFetcheds = response.data;

                        // Seleciona os drinks com prioridade >= 4 para serem exibidos no swiper
                        that.especialDrinks = response.data.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)

                        // initialize swiper
                        that.initSwiper();

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.drinkFound = false;
                        //that.$router.push({name: 'landing.404'})
                    });

            },
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

.cols.align-block{ display: flex; }
.cols.align-block .col{ width: 33.3333%; }

@media(max-width: 768px) { .cols{ column-count: 2; } .cols.align-block .col{ width: 50%; } }
@media(max-width: 414px) { .cols{ column-count: 1; } .cols.align-block { display: grid;} .cols.align-block .col{ width: 100%; } }

/* Drinks & Drink Card */
.list-drinks {
    margin: 40px 0;
}

.drink{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    position: relative;
}
.drink img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.badges + span{
    cursor: pointer;
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

/* Badge */
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

.badge:hover{
    transform: scale(1.05);
}

.badge:active{
    transform: scale(1.00);
}
.badge img{
    max-width: 100%;
}
.badge img.zoom{
    transform: scale(1.1);
}

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
}

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

.tag:hover{
    transform: scale(1.05);
}

.tag:active{
    transform: scale(1.00);
}

.tag-selected >.close-tag{
  opacity: 1;
}
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

</style>
