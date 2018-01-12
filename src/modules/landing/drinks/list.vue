<template>
    <div class="first-container">

        <main-header :type="'menu'" :title="translations.title" :action="back"/>
        <svgIcons />

        <!-- Icon SVG + Title -->
        <div class="container">
            <div class="svg-container">
                <svg viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 90.266653,1.6 c -0.3,-0.7 -1,-1.1 -1.8,-1.1 H 2.4666534 c -0.8,0 -1.49999999,0.4 -1.79999999,1.1 -0.3,0.7 -0.2,1.5 0.3,2.1 L 43.666653,53.8 c 0,0.1 0,0.3 0,0.4 v 30.4 h -11.4 c -1.1,0 -2,0.9 -2,1.9 0,1 0.9,1.9 2,1.9 h 26.5 c 1.1,0 2,-0.9 2,-1.9 0,-1 -0.9,-1.9 -2,-1.9 h -11.3 V 54.2 c 0,-0.2 0,-0.3 -0.1,-0.5 l 42.6,-50 c 0.5,-0.6 0.6,-1.4 0.3,-2.1 z M 45.466653,50 6.6666534,4.4 H 84.366653 Z"
                    />
                </svg>
            </div>

            <h3 class="title-section m-b-10">{{translations.title_section}}</h3>

            <div class="card text-center cursor-pointer card-cat m-b-0 m-t-20"
                 @click="resetCategory()" v-if="currentCategory">
                <div class="card-body card-padding">
                    <img class="cat-icon" :src="currentCategory.photo_url" alt="">
                    <div class="m-t-5">
                        <h6 class="card-title m-b-0">{{currentCategory[`name_${language}`]}}</h6>
                    </div>
                </div>
            </div>

        </div>

        <div class="container-colored m-t-30" :class="{'cat-is-selected' : currentCategory}">

            <div class="container" >

                <h5 class="title-in-colored" v-if="!currentCategory">{{translations.categories}}</h5>

                <!-- Mais Bartenders -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="p-5">
                            <div class="card m-0 text-center">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" src="../../../assets/logo_mb_2.png" alt="">
                                    <div class="m-t-5">
                                        <h6 class="card-title m-b-0">{{ translations.slogan_mb }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORIES -->
                <div class="categories" v-show="!interactions.finished_loading_category && !interactions.is_loading">
                    <!-- ALL -->
                    <div class="category">
                        <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                             @click="selectCategory(categoryAll)">
                            <div class="card-body card-padding">
                                <img class="cat-icon" :src="categoryAll.photo_url" alt="">
                                <div class="m-t-5">
                                    <h6 class="card-title m-b-0">{{categoryAll[`name_${language}`]}}</h6>
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
                                <div class="cat-icon-svg">
                                    <svg viewBox="0 0 100 100">
                                        <use :xlink:href="`#icon-${ category.slug_pt }`"></use>
                                    </svg>
                                </div>
                                <div class="m-t-5">
                                    <h6 class="card-title m-b-0">{{category[`name_${language}`]}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /Fetched categories-->
                </div>
                <!-- /CATEGORIES -->
            </div>


            <!-- DRINKS -->
            <div class="m-b-30" v-show="interactions.finished_loading_category">
                <div class="container">
                    <h4 class="title-in-colored m-0" v-show="drinksFiltered && !drinksFiltered.length">
                        {{translations.no_drinks}}
                    </h4>

                    <!-- Cols -->
                    <div class="cols" v-show="drinksFiltered && drinksFiltered.length">
                        <div class="col" v-for="(drink, index) in drinksFiltered">
                            <!-- Start Drink -->
                            <div class="card m-0">
                                <!-- Card Header -->
                                <div class="card-header cover" :style="{ backgroundImage: `url(${ drink.photo_url })` }">
                                </div>

                                <!-- Card Body -->
                                <div class="card-body card-padding text-center">
                                    <h3 class="title-section t-overflow m-t-10 m-b-10 f-20">{{ drink.name }}</h3>
                                    <p class="m-0 m-b-10 text-overflow" style="color: #222">{{ drink.description }}</p>

                                    <div class="m-b-20" v-if="drink.items.length">
                                        <h3 class="title-section t-overflow m-t-10 m-b-10 f-20">{{ translations.ingredients }}</h3>
                                        <span class="btn btn-xs btn-mb-primary outline m-5" v-for="item in drink.items">{{ language === 'pt' ? item.name_pt : item_en }}</span>
                                    </div>

                                    <button
                                        type="button"
                                        class="btn btn-block btn-mb-primary"
                                        @click="drinkModal(drink)"
                                    >
                                        {{ translations.buttons.drink_details }}
                                    </button>
                                </div>
                            </div>
                            <!-- End Drink -->
                        </div>
                    </div>
                    <!-- / Cols -->

                </div>
            </div>
            <!-- /DRINKS -->

        </div>


        <!-- FIXED BUTTON -->
        <button type="button" class="btn btn-primary btn-mb-primary btn-block btn-fixed-bottom"
                @click.prevent="resetCategory()"
                v-if="interactions.finished_loading_category">
            {{translations.buttons.change_category}}
        </button>

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

        <!--Modal Current Drink -->
        <div class="modal" id="modal-drink" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="title-section m-0" style="font-size: 30px;">{{ currentDrink.name }}</h4>
                    </div>

                    <div class="modal-body ext">

                        <!-- Badges -->
                        <div class="badges">
                           <span class="badge" v-if="currentDrink.is_exclusive">
                               <img src="../../../assets/images/king.svg" :alt="translations.badges.exclusive_drinks_title" :title="translations.badges.exclusive_drinks_title">
                              {{translations.exclusive_drink}}
                           </span>
                            <span class="badge" v-if="currentDrink.priority >= 4">
                               <img src="../../../assets/images/star.svg" :alt="translations.badges.best_sellers_title" :title="translations.badges.best_sellers_title">
                               {{translations.best_sellers}}
                           </span>
                        </div>

                        <!-- Ingredients -->
                        <div class="card">
                            <div class="card-body card-padding">
                                <h4 class="title-section m-0">{{ translations.ingredients }}</h4>
                                <ul class="list-group m-t-30 m-b-0">
                                    <li class="list-group-item" v-for="(item, index) in currentDrink.items">
                                        <span v-show="item.pivot.is_visible" style="color: #000;">
                                            {{ item[`name_${language}`] ? item[`name_${language}`] : item['name_pt'] }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-block btn-mb-default"
                            data-dismiss="modal"
                        >
                            {{ translations.buttons.close_modal }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Current Drink -->

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import svgIcons from '@/components/svg-icons.vue'
    import * as translations from '@/translations/drinks/list'
    import allDrinks from '../../../assets/images/todos_drinks.svg'

    export default {
        name: 'list-drink',
        components: {
            mainHeader,
            svgIcons
        },
        data() {
            return {
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
                    photo_url: allDrinks
                },
                currentDrink: []
            }
        },
        computed: {

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes', 'language']),
            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },

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

            drinkModal: function(drink) {
                this.currentDrink = drink
                $('#modal-drink').modal('show')
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
