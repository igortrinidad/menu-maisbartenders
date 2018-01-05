<template>
    <div class="first-container">

        <main-header :title="'Drinks'"/>

        <!-- CATEGORIES -->
        <div class="container" v-show="!interactions.finished_loading_category && !interactions.is_loading"
             :class="{'cat-is-selected' : currentCategory}">

            <h3 class="text-center">Categorias</h3>

            <p class="text-center section-subheading text-muted">Selecione uma categoria para ver os drinks</p>

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
        <!-- /CATEGORIES -->

        <section class="box-shadow-divider" style="background-color: rgba(44, 60, 80, .07)"
                 v-show="interactions.finished_loading_category">

            <div class="mb-drinks">
                <div class="container">

                    <div class="cols">
                        <div v-for="(drink, index) in drinksFiltered" class="col">
                            <div tag="div" class="box drink"
                                 :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                <div class="badges">
                                   <span class="badge" v-if="drink.is_exclusive" data-toggle="modal"
                                         data-target="#badge-help">
                                       <img src="../../../assets/images/king.png" alt="Este Drink é exclusivo"
                                            title="Este Drink é exclusivo">
                                   </span>
                                    <span class="badge" v-if="drink.priority >= 4" data-toggle="modal"
                                          data-target="#badge-help">
                                       <img class="zoom" src="../../../assets/images/star.png"
                                            alt="Este drink está entre os BEST SELLERS"
                                            title="Este drink está entre os BEST SELLERS">
                                   </span>
                                </div>

                                <router-link tag="span"
                                             :to="{name: 'landing.drinks.show', params: {drink_slug: drink.url}}">
                                    <img :src="drink.photo_url" :alt="drink.name" class="drink-gallery-image">
                                    <div class="details">
                                        <h3 class="drink-name">{{ drink.name }}</h3>
                                        <!-- <i class="stars fa fa-star" v-for="n in drink.priority"></i> -->
                                        <span class="description">{{ drink.description }}</span>

                                        <hr>
                                    </div>
                                </router-link>
                                <h5 class="cursor-pointer" @click="drinkToShowToggle(drink)">
                                    Ingredientes
                                    <i class="fa pull-right"
                                       :class="{'fa-plus' : interactions.drinksToShowInfo.indexOf(drink) < 0, 'fa-minus' : interactions.drinksToShowInfo.indexOf(drink) > -1}"></i>
                                </h5>
                                <div class="items" v-if="isLogged"
                                     :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                    <span class="drink-item" v-for="(item, index) in drink.items">
                                        <span v-show="item.pivot.is_visible">
                                            {{ item.name_pt }}
                                        </span>
                                    </span>
                                </div>

                                <div class="items" :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                    <span class="drink-item" v-if="!isLogged">
                                        Faça login para ver a lista de ingredientes ;)
                                    </span>
                                </div>

                                <div class="">
                                    <div class="box-footer" v-if="isLogged">
                                        <button
                                            class="btn btn-default btn-sm btn-block m-b-10 btn-drink-action facebook btn-share"
                                            @click="addDrinkPreference(drink)"
                                            v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        > Salvar drink
                                        </button>

                                        <router-link
                                            tag="button"
                                            class="btn btn-success btn-sm btn-block m-b-10 btn-drink-action btn-share"
                                            :to="{name: 'landing.user.preferences'}"
                                            v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                                        >Drink salvo <i class="fa fa-check"></i>
                                        </router-link>

                                        <button
                                            class="btn btn-default btn-block m-b-10 btn-drink-action facebook btn-share"
                                            @click.prevent="setDrinkSelected(drink)"
                                        >Compartilhar no Facebook
                                        </button>

                                        <button @click.prevent="likeDrink(drink)" class="btn btn-block btn-like">
                                            <span class="text-muted">{{drink.likes_count}}</span>
                                            <i class="fa fa-heart fa-lg text-danger"
                                               v-if="handleLikedDrinks(drink.id)"></i>
                                            <i class="fa fa-heart-o fa-lg text-danger"
                                               v-if="!handleLikedDrinks(drink.id)"></i>
                                        </button>
                                    </div>

                                    <div class="box-footer" v-if="!isLogged">
                                        <router-link
                                            tag="button"
                                            class="btn btn-success btn-block m-b-10 btn-drink-action btn-share"
                                            :to="{name: 'landing.auth.login', query:{redirect: $route.path}}"
                                        >Faça login para salvar o drink
                                        </router-link>

                                        <router-link
                                            tag="button"
                                            class="btn btn-default btn-block m-b-10 btn-drink-action facebook btn-share"
                                            :to="{name: 'landing.auth.login', query:{redirect: $route.path}}"
                                        >Faça login para compartilhar
                                        </router-link>

                                        <router-link tag="button" class="btn btn-block btn-like"
                                                     :to="{name: 'landing.auth.login', query:{redirect: $route.path}}">
                                            <span class="text-muted">{{drink.likes_count}}</span> <i
                                            class="fa fa-heart-o fa-lg text-danger"></i>
                                            Faça login para curtir
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="container m-b-60">
                <hr class="gray">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <h3>Ainda não decidiu? O que acha de criar agora mesmo o seu prório drink?</h3>
                            <router-link class="btn inline btn-xl m-t-30" :to="{ name: 'landing.drinks.createdrink' }">
                                Crie seu drink!
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary btn-mb-primary btn-block btn-fixed-bottom"
                    @click.prevent="resetCategory()"
                    v-if="interactions.finished_loading_category">
                Alterar categoria
            </button>
        </section>

        <div class="modal fade" id="badge-help" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Ícones nos drinks</h4>
                    </div>
                    <div class="modal-body p-25 text-center">

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/king.png" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p>
                                    Os drinks que estão marcados com este ícone são drink exclusivos Mais Bartenders,
                                    criados e desenvolvidos por nossa equipe.</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/star.png" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p>Os drinks com este ícone são os drinks que mais fazem sucesso nos nossos eventos.</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <span class="modal-badge badge">
                                   <img src="../../../assets/images/drink-created.png" alt="Este Drink é exclusivo"
                                        title="Este Drink é exclusivo">
                               </span>

                                <p>Os drinks com este ícone são os drinks que os convidados criaram.</p>
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

                    if (arr.length) successNotify('', `Localizamos ${arr.length} drinks em 0,${Math.floor(Math.random() * 7) + 1  }s`);
                    return arr;
                }
            },

            especialDrinks: function () {
                return this.drinks.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)
            }
        },
        mounted() {
            this.getDrinks()
        },

        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'setLoading', 'addUserDrinkLike', 'removeUserDrinkLike']),

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
                    that.interactions.finished_loading_category = false;
                    that.setLoading({is_loading: false, message: ''})
                }, 500);


            }
        }
    }
</script>

<style scoped>
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
