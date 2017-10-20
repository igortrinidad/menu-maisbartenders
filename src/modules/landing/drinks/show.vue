<template>
    <div>

        <button class="btn btn-default btn-fixed btn-xl" @click="back()"><i class="fa fa-chevron-left"></i> Voltar</button>

        <div v-if="drinkFound">
            <header id="header-drink" class="header-greeting" v-bind:style="{ backgroundImage: drinkBackground}">
                <div class="container">
                    <div class="col-md-6 col-md-offset-3 col-xs-12">
                        <div class="intro-text">
                        <span class="text-box">
                            <span class="event-name">
                                {{drink.name}}
                            </span>
                        </span>
                            <br>
                            <a href="#drink" v-scroll-to="'#drink'" class="btn btn-xl m-t-30">Ver detalhes</a>
                        </div>
                    </div>
                </div>
            </header>

            <div class="container-fluid">
                <div v-if="isLogged">
                    <button class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5"
                            @click="addDrinkPreference(drink)"
                            v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)">
                        Salvar drink
                    </button>
                    <router-link tag="button" class="btn btn-success btn-sm m-b-10 btn-drink-action btn-share m-r-5"
                                 :to="{name: 'landing.user.preferences'}"
                                 v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)">
                        Drink salvo <i class="fa fa-check"></i>
                    </router-link>
                    <button class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5"
                            @click="interactions.drinkSelected = drink" data-toggle="modal"
                            data-target="#modalSharePhrase">Compartilhar no Facebook
                    </button>
                    <button @click.prevent="likeDrink(drink)" class="btn btn-sm m-b-10 btn-like m-r-5">
                        <span class="text-muted">{{drink.likes_count}}</span>
                        <i class="fa fa-heart fa-lg text-danger" v-if="handleLikedDrinks(drink.id)"></i>
                        <i class="fa fa-heart-o fa-lg text-danger" v-if="!handleLikedDrinks(drink.id)"></i>
                    </button>
                </div>

                <div v-if="!isLogged">
                    <router-link tag="button" class="btn btn-success btn-sm m-b-10 btn-drink-action  btn-share m-r-5"
                                 :to="{name: 'landing.auth.login', query:{redirect: $route.path}}">
                        Faça login para salvar o drink
                    </router-link>
                    <router-link tag="button"
                                 class="btn btn-default btn-sm m-b-10 btn-drink-action facebook btn-share m-r-5"
                                 :to="{name: 'landing.auth.login', query:{redirect: $route.path}}">
                        Faça login para compartilhar
                    </router-link>
                    <router-link tag="button" class="btn btn-sm m-b-10 btn-like m-r-5"
                                 :to="{name: 'landing.auth.login', query:{redirect: $route.path}}">
                        <span class="text-muted">{{drink.likes_count}}</span> <i
                        class="fa fa-heart-o fa-lg text-danger"></i>
                        Faça login para curtir
                    </router-link>
                </div>
            </div>

            <section id="drink">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">

                            <h2 class="section-heading m-b-30">{{drink.name}}</h2>

                            <div class="badges">
                                <div class="badge-container" v-if="drink.is_exclusive">
                                <span class="badge">
                                    <img src="../../../assets/images/king.png" alt="DRINK EXCLUSIVO"
                                         title="DRINK EXCLUSIVO">
                                    <span>Drink Exclusivo</span>
                                </span>
                                </div>
                                <div class="badge-container" v-if="drink.priority >= 4">
                                <span class="badge">
                                    <img class="zoom" src="../../../assets/images/star.png" alt="BEST SELLER"
                                         title="BESTE SELLER">
                                    <span>Best Sellers</span>
                                </span>
                                </div>
                            </div>

                            <p class="m-t-30 text-muted">
                                <strong class="f-20">{{drink.description}}</strong><br>
                            </p>

                            <h3 class="m-b-30">Ingredientes</h3>

                            <p class="m-t-30 text-muted">
                            <span v-for="item in drink.items" v-if="item.pivot.is_visible && isLogged">
                                <strong class="f-20" v-show="item.pivot.is_visible">{{item.name}}</strong><br>
                            </span>

                            <span class="drink-item" v-if="!isLogged">
                                Faça login para ver a lista de ingredientes ;)
                            </span>
                            </p>

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <h4 class="m-b-30">Mapa de sabor</h4>
                                    <canvas ref="createdDrinkChart"></canvas>
                                </div>

                                <div class="col-md-6 col-xs-12">
                                    <h4 class="m-b-30">Informação nutricional</h4>
                                    <div class="row text-left">
                                        <div class="col-md-8 col-md-offset-2 col-xs-12">
                                        <span class="text-left">
                                            <small class="f-16 f-500">Porção: 1 unidade</small>
                                            <table class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th class="text-center">Quantidade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="nutri in nutritional_facts_ordereds">
                                                        <td>{{nutri.name}}</td>
                                                        <td class="text-center">{{nutri.quantity | formatNumber}} {{nutri.unity}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <p class="nutrition-disclaimer">*Os valores nutricionais podem alterar levemente devido à maturação das frutas e quantidade utilizada de cada ingrediente no preparo.</p>
                                            <p class="nutrition-disclaimer">Fonte: <a target="_blank"
                                                                                      href="http://www.tabelanutricional.com.br/">tabelanutricional.com.br</a></p>
                                        </span>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <hr>
                            <router-link
                                :to="{name: 'landing.drinks.list'}"
                                class="btn inline btn-xl m-t-30 m-b-30">
                                Ir para cardápio completo
                            </router-link>
                            <hr>
                            <!-- Comments -->
                            <div class="col-lg-12 text-left">
                                <h4 class="m-b-30">Comentários ({{pagination.total}})</h4>
                                <p v-if="!comments.length">Este drink ainda não possui nenhum comentário.</p>
                                <ul class="media-list">
                                    <li class="media" v-for="comment in comments">
                                        <div class="pull-left">
                                            <img class="media-object img-circle" :src="handleGuestAvatar(comment.guest)"
                                                 width="48">
                                        </div>
                                        <div class="media-body">
                                            <h5 class="media-heading">{{comment.guest.full_name}}</h5>
                                            <span class="text-muted">{{comment.comment}}</span>
                                        </div>

                                    </li>
                                </ul>
                                <div v-if="pagination.total > 0">
                                    <pagination :source="pagination" @navigate="navigate"
                                                :paginator-class="'pagination-sm'"></pagination>
                                </div>
                            </div>
                            <!-- Comments -->
                        </div>
                    </div>
                </div>

            </section>
        </div>

        <div class="" v-if="!drinkFound">
            <header class="header-greeting"
                    v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
                <div class="container">
                    <div class="intro-text">
                        <div class="intro-heading">:(</div>
                        <div class="intro-heading">Não localizamos seu drink</div>
                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="btn btn-info ">
                            Ir para cardápio Mais Bartenders
                        </router-link>
                    </div>
                </div>
            </header>
        </div>

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

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import drinkObj from '../../../models/Drink.js'

    export default {
        name: 'show-drink',
        components: {
            pagination: require('@/components/pagination.vue')
        },
        data () {
            return {
                interactions: {
                    phraseSelected: '',
                },
                drinkFound: true,
                drink: drinkObj,
                comments: [],
                pagination: {},
                displayDrinks: false,
                nutritional_facts: [],
                alcoholStyles: [
                    {label: 'Sem álcool', value: 0},
                    {label: 'Leve', value: 2.5},
                    {label: 'Equilibrado', value: 5.0},
                    {label: 'Forte', value: 7.5},
                    {label: 'Super forte', value: 10},
                ]
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes']),
            drinkBackground: function () {
                return 'url(' + this.drink.photo_url + ')';
            },

            phrases: function () {
                let that = this

                var phrases = [];

                var phrase1 = `Keep calm e toma um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Quero muito um ${that.drink.name}!`;
                phrases.push(phrase1);

                var phrase1 = `Eu preciso de um drink ${that.drink.name} agora!`;
                phrases.push(phrase1);

                var phrase1 = `Tudo que eu preciso é sombra e um ${that.drink.name}.`;
                phrases.push(phrase1);

                return phrases

            },

            nutritional_facts_ordereds: function () {
                let that = this
                return _.orderBy(this.nutritional_facts, 'id', 'asc');
            },

        },
        mounted(){
            this.getDrink();
            this.getDrinkComments();
        },
        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'removeDrinkFromSavedDrinks', 'addUserDrinkLike', 'removeUserDrinkLike']),

            back: () => window.history.back(),

            openShareFacebook: function () {
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=262783620860879&href=https://maisbartenders.com.br/opengraph/drinks/${that.drink.url}/${that.interactions.phraseSelected.replace(" ", "%20")}/no-event&picture=${that.drink.photo_url}&display=popup&mobile_iframe=true`;

                    if(window.cordova){

                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {

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

                        setTimeout( function(){
                            successNotify('', 'Drink compartilhado com sucesso!')
                            $('#modalSharePhrase').modal('hide')
                            that.storeFacebookShare();
                        },1000)
                    }
            },

            checkDrinkNutrition: function () {
                let that = this

                that.nutritional_facts = [];

                that.drink.items.forEach(function (item) {
                    item.nutrients.forEach(function (nutri) {

                        nutri.quantity = parseFloat(item.pivot.quantity) / 100 * parseFloat(nutri.pivot.quantity);


                        var hasNutri = that.nutritional_facts.findFromAttr('name', nutri.name)

                        if (hasNutri) {
                            var index = that.nutritional_facts.indexFromAttr('name', nutri.name)
                            that.nutritional_facts[index].quantity = parseFloat(that.nutritional_facts[index].quantity) + parseFloat(nutri.quantity);

                        } else {
                            that.nutritional_facts.push(nutri)
                        }


                    })
                })

            },

            drawChart: function () {

                var alcohol = this.alcoholStyles.findFromAttr('label', this.drink.style);

                const keys = ['Refrescante', 'Frutado/Doce', 'Amargo', 'Seco', 'Salgado', 'Álcool'];

                const values = [this.drink.sour, this.drink.sweet, this.drink.bitter, this.drink.dry, this.drink.salt, alcohol.value];

                console.log(values);

                if (this.chart) this.chart.destroy()
                this.chart = new Chart(this.$refs.createdDrinkChart, {
                    type: 'radar',
                    pointLabelFontSize: 20,
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                label: this.drink.name,
                                backgroundColor: "RGBA(254, 209, 54, 0.3)",
                                borderColor: "RGBA(254, 209, 54, 1.00)",
                                data: values,
                                pointRadius: 4,
                                pointDot: false,
                                fontSize: 20,
                                defaultFontSize: 30
                            },
                        ]
                    },
                    options: {
                        pointDot: false,
                        showTooltips: false,
                        scaleOverride: true,
                        scaleSteps: 2,
                        scaleStepWidth: 2,
                        scaleBeginAtZero: true,
                        scale: {
                            ticks: {
                                min: 0,
                                max: 10,
                                beginAtZero: 0,
                            },
                            pointLabels: {
                                fontSize: 16,
                                fontColor: '#2c3e50'
                            }
                        }
                    },
                })
            },

            addDrinkPreference: function (drink) {
                let that = this

                var data = {
                    drink_id: that.drink.id,
                    guest_id: this.currentUser.id
                }

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/guest/addDrinkPreference', data)
                    .then(function (response) {

                        that.addDrinkToSavedDrinks(drink) // this is a Vuex action

                        that.setLoading({is_loading: false, message: ''})
                        successNotify('', 'Drink salvo com sucesso!')
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                        errorNotify('Ops!', 'Ocorreu um erro ao salvar seu drink!')
                    });

            },

            storeFacebookShare: function () {
                let that = this

                var data = {
                    drink_id: that.drink.id,
                    guest_id: that.currentUser.id,
                    comment: that.interactions.phraseSelected,
                }

                that.$http.post('/guest/drinkComment', data)
                    .then(function (response) {

                        that.interactions.phraseSelected = ''
                        that.comments.unshift(response.data.comment)
                        that.pagination.total = that.pagination.total + 1
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            getDrink: function () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/drinks/show/' + that.$route.params.drink_slug)
                    .then(function (response) {

                        that.drink = response.data;
                        that.drinkFound = true;
                        that.checkDrinkNutrition();
                        that.setLoading({is_loading: false, message: ''})
                        that.drawChart();
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.drinkFound = false;
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            getDrinkComments: function () {
                let that = this
                that.$http.get('/drinks/comments/' + that.$route.params.drink_slug)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }


                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            navigate(page){
                let that = this
                that.$http.get('/drinks/comments/' + that.$route.params.drink_slug + '?page=' + page)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleGuestAvatar(guest){

                let guest_avatar = null

                if (guest.photo_url) {
                    guest_avatar = guest.photo_url
                }

                if (guest.social_providers.length) {
                    guest_avatar = guest.social_providers.find(provider => provider.provider === 'facebook').photo_url
                }

                return guest_avatar ? guest_avatar : '/static/assets/user_avatar.jpg'
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
    .nutrition-disclaimer {
        font-size: 12px;
    }

    /* Badge */
    .badges {
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
    }

    .badge-container {
        width: 200px;
        position: relative;
        padding: 0 20px 20px 20px;
    }

    .badge:hover {
        transform: none
    }

    .badge {
        margin: 0 auto;
    }

    .badge span {
        display: block;
        width: 100%;
        color: rgba(44, 62, 80, 1);
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        text-transform: uppercase;
    }

    .container-fluid {
        margin-top: 10px;
    }

    section h2.section-heading {
        margin-top: 0px;
    }

    /* Like button */
    .btn-like {
        background-color: transparent;
    }

    .btn-like:hover {
        color: #e74c3c;
    }

</style>

<style>
    /*
    @TODO mover esses styles para o arquivo principal
     */

    /*
    * Paginação
     */
    .pagination > li > a,
    .pagination > li > span {
        color: #2c3e50;
        background-color: #fed136;
    }

    .pagination > li:first-child > a,
    .pagination > li:first-child > span {
        margin-left: 0;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }

    .pagination > li:last-child > a,
    .pagination > li:last-child > span {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }

    .pagination > li > a:hover,
    .pagination > li > span:hover,
    .pagination > li > a:focus,
    .pagination > li > span:focus {
        color: #fff;
        background-color: #fec503;
    }

    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
        color: #fff;
        background-color: #fec503;
    }

    .pagination > .disabled > span,
    .pagination > .disabled > span:hover,
    .pagination > .disabled > span:focus,
    .pagination > .disabled > a,
    .pagination > .disabled > a:hover,
    .pagination > .disabled > a:focus {
        color: #3d5870;
        background-color: #FEE89A;
    }

    /*
    Comentarios
     */
    .media-list {
        padding-left: 0;
        list-style: none;
    }

    .media-object {
        display: block;
    }

    .media, .media-body {
        overflow: hidden;
        zoom: 1;
    }

    .media-heading {
        margin: 0 0 5px;
    }


</style>
