<template>
    <div class="first-container">

        <main-header :title="page_title" :action="back"/>


        <!-- Icon SVG + Title -->
        <div class="container">
            <div class="svg-container">
                <svg viewBox="0 0 90 90">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <path class="non-fill fix animated" stroke="url(#linear)"
                        d="m 35.86,55.74 a 1.5,1.5 0 0 0 2.12,0 L 62.16,31.56 a 1.5,1.5 0 0 0 -2.12,-2.12 l -23.12,23.11 -12,-12 a 1.5,1.5 0 1 0 -2.12,2.12 z"
                    />
                    <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 0,67.75 a 9.51,9.51 0 0 0 9.5,9.5 h 66 a 9.51,9.51 0 0 0 9.5,-9.5 v -49 A 9.51,9.51 0 0 0 75.5,9.25 H 64 V 1.5 a 1.5,1.5 0 1 0 -3,0 V 9.25 H 24 V 1.5 a 1.5,1.5 0 1 0 -3,0 V 9.25 H 9.5 A 9.51,9.51 0 0 0 0,18.75 Z m 3,-49 a 6.51,6.51 0 0 1 6.5,-6.5 H 21 v 5.5 a 1.5,1.5 0 0 0 3,0 v -5.5 h 37 v 5.5 a 1.5,1.5 0 0 0 3,0 v -5.5 h 11.5 a 6.51,6.51 0 0 1 6.5,6.5 v 49 a 6.51,6.51 0 0 1 -6.5,6.5 H 9.5 A 6.51,6.51 0 0 1 3,67.75 Z"
                    />
                </svg>
            </div>

            <h3 class="title-section m-b-10">Cardápio completo</h3>

            <div class="card text-center cursor-pointer card-cat m-b-0 m-t-20"
                 @click="resetCategory()" v-if="currentCategory">
                <div class="card-body card-padding">
                    <img class="cat-icon" :src="currentCategory.photo_url" alt="">
                    <div class="m-t-5">
                        <h6 class="card-title m-b-0">{{currentCategory['name_pt']}}</h6>
                    </div>
                </div>
            </div>

        </div>

        <!-- CATEGORIES -->
        <div class="container-colored m-t-30" v-show="!interactions.finished_loading_category && !interactions.is_loading"
                 :class="{'cat-is-selected' : currentCategory}">
            <div class="container" >

                <h5 class="title-in-colored" v-if="!currentCategory">Selecione uma categoria</h5>

                <!-- Mais Bartenders -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="p-5">
                            <div class="card m-0 text-center">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" src="../../../assets/logo_mb_2.png" alt="">
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">Os melhores drinks estão aqui !</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="categories">
                    <!-- ALL -->
                    <div class="category">
                        <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                             @click="selectCategory(categoryAll)">
                            <div class="card-body card-padding">
                                <img class="cat-icon" src="../../../assets/images/todos_drinks.svg" alt="">
                                <div class="m-t-5">
                                    <h6 class="card-title m-b-0">{{categoryAll['name_pt']}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /ALL -->
                    <!--Fetched categories-->
                    <div class="category" v-for="(category) in categories">
                        <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                             @click="selectCategory(category)">
                            <div class="card-body card-padding">
                                <img class="cat-icon" :src="category.photo_url" alt="">
                                <div class="m-t-5">
                                    <h6 class="card-title m-b-0">{{category['name_pt']}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /Fetched categories-->
                </div>
            </div>
        </div>
        <!-- /CATEGORIES -->

        <div class="container-colored m-t-30 m-b-30" v-show="interactions.finished_loading_category">
            <div class="container">
                <h4 class="title-in-colored m-0" v-show="drinksFiltered && !drinksFiltered.length">
                    Nenhum drink para essa categoria
                </h4>

                <div class="cols" v-show="drinksFiltered && drinksFiltered.length">
                    <div class="col" v-for="(drink, index) in drinksFiltered">
                        <!-- Start Drink -->
                        <div class="card m-0">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ drink.photo_url })` }">
                                <div class="badges">
                                   <span class="badge" v-if="drink.is_exclusive" data-toggle="modal"
                                         data-target="#badge-help">
                                       <img src="../../../assets/images/king.svg" alt="Este Drink é exclusivo"
                                            title="Este Drink é exclusivo">
                                   </span>
                                    <span class="badge" v-if="drink.priority >= 4" data-toggle="modal"
                                          data-target="#badge-help">
                                       <img class="zoom" src="../../../assets/images/star.svg"
                                            alt="Este drink está entre os BEST SELLERS"
                                            title="Este drink está entre os BEST SELLERS">
                                   </span>
                                </div>
                            </div>

                            <!-- Card Body -->
                            <div class="card-body card-padding text-center">
                                <router-link tag="div" :to="{ name: 'landing.drinks.show', params: { drink_slug: drink.url} }">
                                    <h3 class="card-title t-overflow">{{ drink.name }}</h3>
                                    <p class="description m-0">{{ drink.description }}</p>
                                </router-link>

                                <button
                                    type="button"
                                    class="btn btn-xs btn-mb-primary outline m-t-15"
                                    @click="itemsModal(drink.items)"
                                    v-if="isLogged && drink.items.length"
                                >
                                    Ver Ingredientes
                                </button>

                                <!-- Like -->
                                <div class="m-t-15 m-b-30" v-if="isLogged">
                                    <!-- Svg -->
                                    <div class="svg-container min" :class="{ 'bounce' : handleLikedDrinks(drink.id) }">
                                        <svg viewBox="0 0 30 30">
                                            <defs>
                                                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%"   stop-color="#FB923B"/>
                                                    <stop offset="100%" stop-color="#F66439"/>
                                                </linearGradient>
                                            </defs>
                                            <g transform="translate(-8.9261333,-9.447)">
                                                <path
                                                    @click.prevent="likeDrink(drink)"
                                                    class="animated"
                                                    stroke="url(#linear)"
                                                    :fill="`${ handleLikedDrinks(drink.id) ? 'url(#linear)' : 'transparent' }`"
                                                    d="M 24,38.052 23.497,37.756 C 23.19,37.575 15.924,33.25 11.778,26.697 9.575,23.218 8.89,19.544 9.848,16.354 c 0.785,-2.611 2.605,-4.676 5.126,-5.81 0.88,-0.396 1.788,-0.597 2.699,-0.597 2.917,0 5.181,2.028 6.327,3.321 1.147,-1.293 3.41,-3.321 6.328,-3.321 0.911,0 1.819,0.2 2.698,0.597 2.521,1.134 4.342,3.198 5.127,5.81 0.958,3.189 0.272,6.862 -1.93,10.344 -4.146,6.552 -11.412,10.877 -11.719,11.058 z"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <span class="text-muted" v-if="drink.likes_count > 0">
                                        {{ drink.likes_count > 1 ? `${ drinks.likes_count } Likes` : `1 Like` }}
                                    </span>
                                    <span class="text-muted" v-if="drink.likes_count === 0">Seja o primeiro a curtir</span>
                                </div>

                                <!-- Login To Like -->
                                <div class="m-t-20" v-if="!isLogged">
                                    <router-link class="btn btn-mb-primary" tag="button" :to="{ name: 'landing.auth.login' }">
                                        Faça o login para curtir
                                    </router-link>
                                </div>

                                <!-- Save Drink -->
                                <button
                                    class="btn btn-mb-info btn-fixed-bottom btn-save"
                                    @click="addDrinkPreference(drink)"
                                    v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                > Salvar drink
                                </button>

                                <router-link
                                    tag="button"
                                    class="btn btn-mb-info btn-fixed-bottom btn-save"
                                    :to="{ name: 'landing.user.preferences' }"
                                    v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                >Drink salvo <i class="fa fa-check"></i>
                                </router-link>

                            </div>
                        </div>
                        <!-- End Drink -->

                    </div>
                </div>
            </div>
        </div>

        <!-- FIXED BUTTON -->
        <button type="button" class="btn btn-primary btn-mb-primary btn-block btn-fixed-bottom"
                @click.prevent="resetCategory()"
                v-if="interactions.finished_loading_category">
            Alterar categoria
        </button>

        <div class="modal fade" id="badge-help" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="title-section m-0">Ícones nos drinks</h4>
                    </div>
                    <div class="modal-body text-center">

                        <div class="card">
                            <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/king.svg" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p style="color: #222;">
                                    Os drinks que estão marcados com este ícone são drink exclusivos Mais Bartenders,
                                    criados e desenvolvidos por nossa equipe.</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/star.svg" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p style="color: #222;">Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos eventos.</p>
                            </div>
                        </div>
                        <div class="card m-0">
                            <div class="card-body card-padding">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/drink-created.svg" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p style="color: #222;">Os drinks com este ícone são os drinks que os convidados criaram.</p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-mb-primary">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Modal Share-->
        <div class="modal fade" id="modalSharePhrase" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Escolha uma frase</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>Escolha uma frase e compartilhe o drink em seu Facebook.</p>
                        <br>

                        <p class="phrase" v-for="(phrase, index) in phrases"
                           @click="interactions.phraseSelected = phrase"
                           :class="{'phraseSelected' : interactions.phraseSelected == phrase}">{{phrase}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default m-b-10 btn-drink-action facebook btn-share btn-block"
                                @click="openShareFacebook()"
                                :disabled="!interactions.phraseSelected">Compartilhar no Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Share-->

        <!--Modal Current Items -->
        <div class="modal" id="modal-items" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body card-padding">
                                <h4 class="title-section m-0">Ingredientes</h4>
                                <ul class="list-group m-t-30 m-b-0">
                                    <li class="list-group-item" v-for="(item, index) in currentItems">
                                        <span v-show="item.pivot.is_visible" style="color: #222;">
                                            {{ item.name_pt }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-mb-primary"
                            data-dismiss="modal"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Current Items -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'list-drink',
        components: {
            mainHeader
        },
        data() {
            return {
                page_title: 'Drinks',
                interactions: {
                    showTags: false,
                    drinksToShowInfo: [],
                    phraseSelected: '',
                    finished_loading_category: false,
                    is_loading: true,
                },
                drinkFetcheds: [],
                filterOptions: [],
                guestDrinks: [],
                exclusiveBadge: '../../../../static/assets/king.png',
                starBadge: '../../../../static/assets/star.png',
                drinkSelected: null,
                phrases: [],
                response: '',
                categories: [],
                filterCategories: [],
                currentCategory: null,
                categoryAll: {
                    name_en: 'All drinks',
                    name_pt: 'Todos os drinks',
                    slug_pt: 'todas',
                    slug_en: 'all',
                    photo_url: ''
                },
                currentItems: []
            }
        },
        computed: {

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),

            drinks: function () {
                return _.orderBy(this.drinkFetcheds, 'priority', 'desc');
            },


            drinksFiltered: function () {
                var that = this
                if (that.currentCategory) {
                    var arr = this.drinks.filter(function (drink) {
                        return that.checkIfDrinkHasCategory(drink)
                    })
                    return arr;
                }
            },

        },
        mounted() {
            this.getDrinks()
        },

        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'setLoading', 'addUserDrinkLike', 'removeUserDrinkLike', 'setSelectedCategory']),

            itemsModal: function(items) {
                this.currentItems = items
                $('#modal-items').modal('show')
            },

            drinkToShowToggle: function (drink) {
                let that = this
                var index = that.interactions.drinksToShowInfo.indexOf(drink);
                if (index > -1) {
                    that.interactions.drinksToShowInfo.splice(index, 1)
                } else {
                    that.interactions.drinksToShowInfo.push(drink)
                }
            },

            checkIfDrinkHasItem: function (drink) {

                if (!this.filterOptions.length) return true
                return (
                    _.chain(drink.items)
                        .map((i) => i.name_pt)
                        .some(item => this.filterOptions.includes(item))
                        .value()
                )
            },

            applyFilterOptions: function (item, event) {
                const index = this.filterOptions.indexOf(item)

                if (index > -1) {
                    this.filterOptions.splice(index, 1)
                } else {
                    this.filterOptions.push(item)
                }
            },

            clearFilter: function () {
                this.filterOptions = []
            },

            getDrinks: function () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {

                        // Lista de drinks
                        that.drinkFetcheds = response.data.drinks
                        that.categories = response.data.categories
                        that.interactions.is_loading = false

                        that.$nextTick(() =>{
                            let currentCategory = JSON.parse(localStorage.getItem('selected_category'))
                            if(currentCategory){

                                if(currentCategory.slug_pt == 'todas' || currentCategory.slug_en == 'all'){
                                    that.selectCategory(that.categoryAll)
                                }else{
                                    let category = _.find(that.categories, {id: currentCategory.id} )

                                    if(category){
                                        that.selectCategory(category)
                                    }
                                }
                            }
                        })

                        that.setLoading({is_loading: false, message: ''})


                    })
                    .catch(function (error) {
                        console.log(error)
                        that.drinkFound = false;
                        that.setLoading({is_loading: false, message: ''})
                    });

            },


            addDrinkPreference: function (drink) {
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

            setDrinkSelected(drink) {
                let that = this
                that.drinkSelected = drink
                that.sharePhrases()

                $('#modalSharePhrase').modal('show')

            },

            sharePhrases() {
                let that = this

                var phrases = [];

                var phrase1 = `Keep calm e toma um ${that.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Quero muito um ${that.drinkSelected.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Eu preciso de um drink ${that.drinkSelected.name} agora!`;
                phrases.push(phrase1);

                var phrase1 = `Tudo que eu preciso é sombra e um ${that.drinkSelected.name}.`;
                phrases.push(phrase1);

                that.phrases = phrases

            },

            openShareFacebook: function () {
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=262783620860879&href=https://maisbartenders.com.br/opengraph/drinks/${that.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}/no-event&picture=${that.drinkSelected.photo_url}&display=popup&mobile_iframe=true&close=true`;

                if (window.cordova) {

                    var ref = window.open(url, '_blank', 'location=yes');
                    ref.addEventListener('loadstart', function (event) {

                        var url = "https://www.facebook.com/dialog/return/close";

                        if (event.url.indexOf(url) !== -1) {

                            ref.close();
                            successNotify('', 'Drink compartilhado com sucesso!')
                            $('#modalSharePhrase').modal('hide')
                            that.storeFacebookShare();

                        }
                    });

                } else {
                    window.open(url, '_blank', 'location=yes');

                    setTimeout(function () {
                        successNotify('', 'Drink compartilhado com sucesso!')
                        $('#modalSharePhrase').modal('hide')
                        that.storeFacebookShare();
                    }, 1000)
                }

            },

            storeFacebookShare: function () {
                let that = this

                var data = {
                    drink_id: that.drinkSelected.id,
                    guest_id: that.currentUser.id,
                    comment: that.interactions.phraseSelected,
                }

                that.$http.post('/guest/drinkComment', data)
                    .then(function (response) {

                        that.interactions.phraseSelected = ''
                        that.drinkSelected = null
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            likeDrink(drink) {
                let that = this

                let data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                if (that.userDrinkLikes.checkFromAttr('drink_id', drink.id)) {
                    that.removeUserDrinkLike({"drink_id": drink.id})
                    drink.likes_count = drink.likes_count - 1
                } else {
                    that.addUserDrinkLike({"drink_id": drink.id})
                    drink.likes_count = drink.likes_count + 1
                }

                that.$http.post('/guest/likeDrink', data)
                    .then(function (response) {

                    })
                    .catch(function (error) {

                        if (!this.userDrinkLikes.checkFromAttr('drink_id', drink.id)) {
                            that.removeUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count - 1
                        } else {
                            that.addUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count + 1
                        }

                    });
            },

            handleLikedDrinks(drink_id) {
                return this.userDrinkLikes.find(like => like.drink_id === drink_id) ? true : false
            },

            applyCategoryFilter(category_slug) {
                let index = this.filterCategories.indexOf(category_slug)

                if (index > -1) {
                    this.filterCategories.splice(index, 1)
                } else {
                    this.filterCategories.push(category_slug)
                }
            },

            checkIfDrinkHasCategory: function (drink) {

                if (this.currentCategory && this.currentCategory.slug_en == 'all' || this.currentCategory && this.currentCategory.slug_pt == 'todas') return true

                if (!this.filterCategories.length) return true

                return (
                    _.chain(drink.categories)
                        .map((i) => i.slug_pt)
                        .some(item => this.filterCategories.includes(item))
                        .value()
                )
            },

            selectCategory(category) {
                let that = this
                that.setLoading({is_loading: true, message: ''})
                that.currentCategory = category;
                that.applyCategoryFilter(category.slug_pt)

                that.setSelectedCategory(category)

                //Alterar quando tiver tradução para traduzido
                that.page_title = that.currentCategory.name_pt;

                setTimeout(function () {
                    that.interactions.is_loading = false;
                    that.interactions.finished_loading_category = true;
                    that.setLoading({is_loading: false, message: ''})
                }, 500);
            },

            resetCategory() {
                let that = this
                that.setLoading({is_loading: true, message: ''})

                setTimeout(function () {
                    that.currentCategory = null;
                    that.page_title = 'Drinks';
                    that.interactions.finished_loading_category = false;
                    localStorage.removeItem('selected_category')
                    that.setLoading({is_loading: false, message: ''})
                }, 500);


            },

            back: function(){
                let that = this

                if(that.currentCategory){
                    that.resetCategory();
                    return
                }

                window.history.back();
            },
        }
    }
</script>

<style scoped>
    .svg-container.min { width: 40px; }

    .btn.btn-mb-info.btn-fixed-bottom.btn-save {
        border-radius: 0 0 10px 10px;
    }

    /* Some Default Styles for page*/

    .btn-xl.all {
        font-weight: bold;
        margin: 20px 0;
        padding: 10px 20px;
        color: #2c3e50;
    }

    /* Page & Grid*/
    .mb-most-recommended {
        margin: 20px auto;
    }

    #drinks {
        background-color: rgba(44, 60, 80, .07);
        padding: 80px 0;
    }

    /* Like button */
    .btn-like {
        background-color: transparent;
    }

    .btn-like:hover {
        color: #e74c3c;
    }

    section {
        padding: 25px 0;
    }

    .box-shadow-divider {
        box-shadow: 0px 2px 3px rgba(0, 0, 0, .1), 0px -2px 3px rgba(0, 0, 0, .1);
    }

    .cat-icon {
        width: auto;
        height: 60px;
    }

    .card-cat {
        box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    }

    .m-b-60 {
        margin-bottom: 60px;
    }


</style>
