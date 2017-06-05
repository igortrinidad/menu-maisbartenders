<template>
   <div class="page" id="header-page">

       <div class="container mb-most-recommended">
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
               <a href="#drinks" class="page-scroll btn btn-primary btn-block m-t-10">Ver todos</a>
           </div>
       </div>

      <section id="drinks">
           <div class="container">
               <div class="filter">
                   <div class="text-center">
                       <h3>Ingredientes:</h3>
                       <span class="sub">Selecione os ingredientes de sua preferência.</span>
                   </div>

                   <div class="mb-tags">
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

                   <div class="mb-tags" v-if="interactions.showTags">
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

           <div class="mb-drinks">
               <div class="container">
                   <div class="cols">
                       <div v-for="(drink, index) in drinksFiltered" class="col">
                           <div tag="div" class="box drink" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                               <div class="badges">
                                   <span class="badge" v-if="drink.is_exclusive" data-toggle="modal" data-target="#badge-help">
                                       <img src="https://maisbartenders.com.br/assets/menu_app/king.png" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                                   </span>
                                   <span class="badge" v-if="drink.priority >= 4" data-toggle="modal" data-target="#badge-help">
                                       <img class="zoom" src="https://maisbartenders.com.br/assets/menu_app/star.png" alt="Este drink está entre os BEST SELLERS" title="Este drink está entre os BEST SELLERS">
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

                               </router-link>
                               <div class="m-t-10 p-l-10" >
                                <div v-if="isLogged">
                                    <button class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5"
                                    @click="addDrinkPreference(drink)" v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)">
                                        Salvar drink
                                    </button>
                                    <router-link tag="button" class="btn btn-success btn-sm m-b-10 btn-drink-action btn-share m-r-5" :to="{name: 'landing.user.preferences'}" v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)">Drink salvo <i class="fa fa-check"></i>
                                   </router-link >
                                    <button  class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5" @click="interactions.drinkSelected = drink" data-toggle="modal" data-target="#modalSharePhrase">Compartilhar no Facebook</button>
                                </div>

                                <div v-if="!isLogged">
                                   <router-link tag="button" class="btn btn-success btn-sm m-b-10 btn-drink-action  btn-share m-r-5" :to="{name: 'landing.auth.login'}">Faça login para salvar o drink
                                   </router-link >
                                  <router-link tag="button" class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5" :to="{name: 'landing.auth.login'}">Faça login para compartilhar
                                   </router-link >
                                </div>
                            </div>
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
                                   <img src="https://maisbartenders.com.br/assets/menu_app/king.png" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               </span>

                               <p>Os drinks que estão marcados com este ícone são drink exclusivos Mais Bartenders, criados e desenvolvidos por nossa equipe.</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="https://maisbartenders.com.br/assets/menu_app/star.png" alt="Este Drink é exclusivo" title="Este Drink é exclusivo">
                               </span>

                               <p>Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos eventos.</p>
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'list-drink',
        data () {
            return {
                interactions: {
                    showTags: false
              },
              drinkFetcheds: [],
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

            especialDrinks: function(){

                return this.drinks.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)
            },
        },
        mounted(){
            this.initSwiper()
            this.getDrinks()
            this.$nextTick(() => {
              this.initPageScroll()
            });
        },

        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks']),

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
            },

            getDrinks: function(){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {

                        // Lista de drinks
                        that.drinkFetcheds = response.data;

                        that.initSwiper();

                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.drinkFound = false;
                        that.setLoading({is_loading: false, message: ''})
                    });

            },


            addDrinkPreference: function(drink){
                let that = this

                var data = {
                    drink_id: drink.id,
                    guest_id: this.currentUser.id
                }

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/guest/addDrinkPreference', data)
                    .then(function (response) {

                        that.addDrinkToSavedDrinks(drink) // this is a Vuex action

                        successNotify('', 'Drink salvo com sucesso!')
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        errorNotify('Ops!', 'Ocorreu um erro ao salvar seu drink!')
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            initPageScroll: function(){
                let that = this

                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
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
.mb-most-recommended{ margin: 20px auto; }
#drinks{ background-color: rgba(44, 60, 80, .07); padding: 80px 0; }

</style>
