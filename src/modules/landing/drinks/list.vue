<template>
    <div class="page">

        <div class="container m-t-30 text-center">
            <h2>Best Sellers</h2>
            <span class="sub-header">Aqui está uma lista com as principais recomendações para você.</span>
        </div>

        <!-- SWIPER -->
        <div class="swiper-row">
            <div class="swiper-container gallery-top" ref="swiper">
                <div class="swiper-wrapper">

                    <div class="swiper-slide" v-for="(drink, index) in especialDrinks" key="index">
                        <img :src="drink.photo_url" :alt="drink.name" class="swiper-image" width="100%"/>
                        <!--
                        <span class="swiper-stars">
                           <i class="fa fa-star" v-for="n in drink.priority"></i>
                       </span>
                       -->
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

        <div class="text-center container backsection">
            <span class="sub-header">Ainda não decidiu? não se preocupe você pode ver todos os drinks e filtrar com os nossos ingredientes que você preferir.</span>
            <a href="#drinks" v-scroll-to="'#drinks'" class="page-scroll btn btn-primary btn-block m-t-10">Ver todos</a>
        </div>

        <section id="drinks">
            <div class="container">
                <div class="filter">
                    <div class="text-center">
                        <h3>Ingredientes:</h3>
                        <span class="sub-header">Selecione os ingredientes de sua preferência.</span>
                    </div>

                    <div class="mb-tags">
                        <div class="tags">
                            <div class="tag">
                                <button type="button" :class="{'tag-selected': interactions.showTags}"
                                        @click="interactions.showTags = !interactions.showTags">
                                    <span class="tag-name">Mostrar filtros</span>
                                </button>
                            </div>
                            <div class="tag" v-if="interactions.showTags">
                                <button type="button" :class="{'tag-selected': filterOptions.length}"
                                        @click="clearFilter()">
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
                                <div class="items" :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                    <span class="drink-item" v-for="(item, index) in drink.items" >
                                        <span v-show="item.pivot.is_visible">
                                            {{ item.name }}
                                        </span>
                                    </span>
                                </div>
                                <div class="items" :class="{'show': interactions.drinksToShowInfo.indexOf(drink) >-1}">
                                    <span class="drink-item" v-if="!drink.items.length">
                                        Não foi possível carregar items para este drink :(
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
            <div class="container">
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
                                    Os drinks que estão marcados com este ícone são drink exclusivos Mais Bartenders, criados e desenvolvidos por nossa equipe.</p>
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

        <!--Modal Share-->]
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
                        <button type="button" class="btn btn-default m-b-10 btn-drink-action facebook btn-share btn-block" @click="openShareFacebook()"
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

    export default {
        name: 'list-drink',
        data () {
            return {
                interactions: {
                    showTags: false,
                    drinksToShowInfo: [],
                    phraseSelected: '',
                },
                drinkFetcheds: [],
                filterOptions: [],
                guestDrinks: [],
                exclusiveBadge: '../../../../static/assets/king.png',
                starBadge: '../../../../static/assets/star.png',
                drinkSelected: null,
                phrases: []
            }
        },
        computed: {

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),

            drinks: function () {
                return _.orderBy(this.drinkFetcheds, 'priority', 'desc');
            },

            drinksFiltered: function () {
                var that = this
                var arr = this.drinks.filter(function (drink) {
                    return that.checkIfDrinkHasItem(drink)
                })

                if (arr.length) successNotify('', `Localizamos ${arr.length} drinks em 0,${Math.floor(Math.random() * 7) + 1  }s`);
                return arr;
            },

            tags: function () {
                let that = this

                var arr = [];

                that.drinks.map((drink) => {
                    drink.items.map((item) => {
                        if (arr.checkFromAttr('name', item.name)) {
                            return false
                        } else {
                            arr.push({name: item.name, category: item.category})
                        }
                    });
                });

                return _.orderBy(arr, 'category', 'asc');

            },

            especialDrinks: function () {
                return this.drinks.map((drink) => drink.priority >= 4 ? drink : undefined).filter((drink) => drink !== undefined)
            }
        },
        mounted(){
            this.initSwiper()
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
            initSwiper: function () {
                var that = this;

                setTimeout(function () {
                    var galleryTop = new Swiper(that.$refs.swiper, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 10,
                    });

                    galleryTop.update(true)

                }, 200)

            },

            checkIfDrinkHasItem: function (drink) {

                if (!this.filterOptions.length) return true
                return (
                    _.chain(drink.items)
                        .map((i) => i.name)
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

            setDrinkSelected(drink){
                let that = this
                that.drinkSelected = drink
                that.sharePhrases()

                $('#modalSharePhrase').modal('show')

            },

            sharePhrases(){
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

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}/no-event&picture=${that.drinkSelected.photo_url}&display=popup&mobile_iframe=true`;

                that.setLoading({is_loading: true, message: ''})

                if (window.cordova) {

                    $('#modalSharePhrase').modal('hide')

                    openFB.api({
                        method: 'POST',
                        path: '/me/feed',
                        params: {
                            message: '',
                            link: 'https://maisbartenders.com.br/opengraph/drinks/' + that.drinkSelected.url + '/' + that.interactions.phraseSelected.replace(" ", "%20") + '/no-event',
                            name: that.drinkSelected.name,
                            picture: that.drinkSelected.photo_url
                        },
                        success: function () {
                            successNotify('', 'Drink compartilhado com sucesso!')
                            that.setLoading({is_loading: false, message: ''})
                            that.storeFacebookShare();

                        },
                        error: function () {
                            that.setLoading({is_loading: false, message: ''})
                            errorNotify('', 'Sua sessão expirou, faça login novamente.')
                            that.$router.push({
                                name: 'landing.auth.logout',
                                query: {redirect: '/login', redirect_back: that.$route.path}
                            })
                        }
                    });
                }

                if (!window.cordova) {
                    window.open(url, '_blank');
                    $('#modalSharePhrase').modal('hide')
                    that.setLoading({is_loading: false, message: ''})
                    successNotify('', 'Drink compartilhado com sucesso!')
                    that.storeFacebookShare();
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

            likeDrink(drink){
                let that = this

                let data = {
                    drink_id: drink.id,
                    guest_id: that.currentUser.id
                }

                if(that.userDrinkLikes.checkFromAttr('drink_id', drink.id)){
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
                    
                        if(!this.userDrinkLikes.checkFromAttr('drink_id', drink.id)){
                            that.removeUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count - 1
                        } else {
                            that.addUserDrinkLike({"drink_id": drink.id})
                            drink.likes_count = drink.likes_count + 1
                        }

                    });
            },

            handleLikedDrinks(drink_id){
                return this.userDrinkLikes.find(like => like.drink_id === drink_id) ? true : false
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

</style>
