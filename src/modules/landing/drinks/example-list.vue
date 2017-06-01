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
                                <!-- aqui eu preciso adicionar uma tag fixa 'button tag' e uma outra para cada tipo de categoria, fruta ou bebida,nao sei e o o melhor jeito assim: -->
                                <button
                                    class="button-tag"
                                    :class="{ 'fruit': tag.priority === 1, 'drink': tag.priority === -1 }"
                                    type="button"
                                    @click="applyFilterOptions(tag.name, $event)"
                                >
                                   {{ tag.name }}
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
               <div class="container">
                   <div class="cols">
                       <div v-for="(drink, index) in drinks" v-if="drinksFiltered[index] && drink.is_active" class="col">
                           <router-link tag="div" class="drink" :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                                <div class="details">
                                    <h3 class="drink-name">{{ drink.name }}</h3>
                                    <i class="stars fa fa-star" v-for="n in drink.priority"></i>
                                    <span class="description">{{ drink.description }}</span>
                                    <div class="items">
                                        <span class="item" v-for="(item, index) in drink.items">{{ item.name }}</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                   </div>
               </div>
           </div>
       </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'show-drink',
        data () {
            return {
                drinkFetcheds: [],
                drinksFiltered: [],
                especialDrinks: [],
                filterOptions: [],
                tags: []
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

            applyFilterOptions: function(item, event) {
                const index = this.filterOptions.indexOf(item)

                if(index > -1) this.filterOptions.splice(index,1)
                else this.filterOptions.push(item)

                if (this.filterOptions.length) {
                    this.drinksFiltered = this.drinks.map((drink) =>
                        _.chain(drink.items)
                        .map((i) => i.name)
                        .some(item => this.filterOptions.includes(item))
                        .value()
                    )
                }
                else this.drinksFiltered = this.drinks.map((drink) => true)

                if (event) {
                    const el = event.target.className
                    if (el === 'button-tag fruit' || el === 'button-tag drink')
                        event.target.className = `${el} icon-close`
                    else event.target.classList.remove('icon-close')
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

                        // lista de drinks a serem exibidos (o valor true vai ganhar false quando for exibido)
                        that.drinksFiltered = response.data.map((drink) => true)

                        // Seleciona os drinks com prioridade >= 4 para serem exibidos no swiper
                        that.especialDrinks = response.data.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)

                        // Cria lista de tags com todas os items de drinks pegando seus nomes.
                        // Elimina itens repetidos da lista.
                        // Ordena para serem exibidos Frutas em primeiro e depois Bebidas.
                        that.tags = _.chain(response.data)
                            .map((drink) => drink.items.map((item) => {
                                if(item.category.toLowerCase() === 'frutas') return { name: item.name, priority: 1}
                                if(item.category.toLowerCase() === 'bebidas') return { name: item.name, priority: -1 }
                            }))
                            .flatten()
                            .filter((item) => item !== undefined)
                            .reduce((a,b) => { if(a.indexOf(b)<0)a.push(b);return a }
                            ,[])
                            .sort((a, b) => a.priority > b.priority ? -1 : 1)
                            .value()

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
    margin: 10px 0;
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
.tags .tag button.button-tag{ padding-right: 45px ; }
.tags .tag button.button-tag:before{
    content: '+';
    position: absolute;
    font-size: 20px;
    right: 20px;
    top: 5.5px;
    font-weight: 900;
    transition: ease .3s;
}
.tags .tag button.button-tag.icon-close:before{
    transition: ease .3s;
    transform: rotate(45deg);
}


.tags .tag button.fruit{ background: #502c50; }
.tags .tag button.drink{ background: #2c5042; }

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
