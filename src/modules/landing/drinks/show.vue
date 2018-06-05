<template>
    <div class="first-container show">

        <main-header :type="'back'" :title="drink.name" />

        <div>
            <div class="show-header" v-bind:style="{ backgroundImage: drinkBackground}">

                <span>
                    <a href="#drink" v-scroll-to="'#drink'">{{translations.buttons.details}}</a>
                </span>

            </div>

            <div class="svg-container text-center m-t-30" :class="{ 'bounce' : handleLikedDrinks(drink.id) }">
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

            <div class="text-center m-t-20">
                <h4 class="section-title" v-if="drink.likes_count > 0">
                    {{ drink.likes_count > 1 ? `${ drink.likes_count } ${ translations.likes }` : `1 ${translations.like }` }}
                </h4>
                <span class="text-muted" v-if="drink.likes_count === 0">{{translations.be_first}}</span>
                <router-link
                    tag="button"
                    class="btn btn-mb-primary"
                    :to="{ name: 'landing.auth.login', query:{ redirect: $route.path } }"
                    v-if="!isLogged"
                >
                    {{translations.login_like}}
                </router-link>
            </div>

            <div id="drink" class="container-colored m-t-30">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">

                            <!-- drink description and created_by -->
                            <div class="card m-t-30">
                                <div class="card-body card-padding">

                                    <div class="" v-if="drink.created_by">
                                        <p>{{ translations.created_by }}</p>
                                        <h4>{{drink.created_by}}</h4>
                                    </div>

                                    <p class="f-16">{{drink.description}}</p>
                                </div>
                            </div>               
                            

                            <div class="card m-t-30">
                                <div class="card-body card-padding">
                                    <div v-if="isLogged">
                                        <h4 class="m-0">{{translations.ingredients}}</h4>

                                        <ul class="list-group m-t-30 m-b-0">
                                            <li class="list-group-item" v-for="item in drink.items" v-if="item.pivot.is_visible">
                                                <span v-show="item.pivot.is_visible" style="color: #000;">
                                                    {{ item[`name_${language}`] ? item[`name_${language}`] : item['name_pt'] }}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="!isLogged">
                                        <router-link tag="button" class="btn btn-mb-primary outline" :to="{ name: 'landing.auth.login', query: {redirect: $route.path} }">
                                            {{translations.unauthenticated}}
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-30">{{translations.flavor_map}}</h4>
                                            <canvas ref="createdDrinkChart"></canvas>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-30">{{translations.nutrional_information}}</h4>
                                            <div class="row text-left">
                                                <div class="col-md-8 col-md-offset-2 col-xs-12">
                                                <span class="text-left">
                                                    <small class="f-16 f-500">{{translations.serving_size}}</small>
                                                    <table class="table table-bordered table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>{{translations.description}}</th>
                                                                <th class="text-center">{{translations.quantity}}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="nutri in nutritional_facts_ordereds">
                                                                <td>{{nutri[`name_${language}`] ? nutri[`name_${language}`] : nutri['name_pt']}}</td>
                                                                <td class="text-center">{{nutri.quantity | formatNumber}} {{nutri.unity}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <p class="nutrition-disclaimer">{{translations.informational_warning}}</p>
                                                    <p class="nutrition-disclaimer">{{translations.source}} <a target="_blank"
                                                                                              href="http://www.tabelanutricional.com.br/">tabelanutricional.com.br</a></p>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <router-link
                                :to="{name: 'landing.drinks.list'}"
                                class="btn btn-block btn-mb-primary-reverse outline m-b-30">
                                {{translations.buttons.go_to_menu}}
                            </router-link>

                            <!-- Comments -->
                            <div class="row">
                                <div class="col-lg-12 text-left">
                                    <div class="card">
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-30">{{translations.comments}} ({{pagination.total}})</h4>

                                            <div class="text-center m-20" v-if="isLogged">
                                                <button class="btn btn-mb-primary" data-target="#modal-comment"
                                                        data-toggle="modal"><i class="fa fa-comment"></i>
                                                    {{translations.buttons.new_comment}}
                                                </button>
                                            </div>

                                            <div class="text-center m-20" v-if="!isLogged">
                                                <router-link tag="button" class="btn btn-mb-primary"
                                                             :to="{name: 'landing.auth.login', query:{redirect: $route.path}}"
                                                >
                                                    {{translations.buttons.comment_unauthenticated}}
                                                </router-link>
                                            </div>

                                            <p class="text-muted" v-if="!comments.length">{{translations.no_comments}}</p>

                                            <ul class="media-list">
                                                <li class="media" v-for="comment in comments">
                                                    <div class="pull-left">
                                                        <img class="media-object img-circle" :src="comment.guest.photo_url"
                                                             width="48">
                                                    </div>
                                                    <div class="media-body">
                                                        <h5 class="media-heading">{{comment.guest.full_name}}</h5>
                                                        <span class="text-muted">{{comment.comment}}</span>
                                                    </div>

                                                </li>
                                            </ul>
                                            <div v-show="pagination.total > 0" class="text-center">
                                                <pagination :source="pagination" @navigate="navigate"
                                                            :paginator-class="'pagination-sm'"></pagination>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Comments -->
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <!-- Modal commentário -->
        <div class="modal fade" id="modal-comment" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{translations.modal.title}}</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>
                            {{translations.modal.message}} {{drink.name}}</p>
                        <br>
                        <div class="form-group">
                            <label>{translations.modal.label}}*</label>
                            <textarea class="form-control" v-model="newComment.comment" :placeholder="translations.modal.placeholder"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-mb-primary m-b-10 btn-block"
                                @click="saveComment()"
                                :disabled="!newComment.comment"> {{translations.modal.button}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal commentário -->

        <!-- Btn Save Drink -->
        <div v-if="isLogged">
            <button
                class="btn btn-fixed-bottom btn-mb-info"
                @click="addDrinkPreference(drink)"
                v-if="currentUser.saved_drinks && !currentUser.saved_drinks.checkFromAttr('id', drink.id)"
                style="position: fixed"
            >
                {{translations.buttons.save_drink}}
            </button>
            <router-link tag="button" class="btn btn-fixed-bottom btn-mb-info" style="position: fixed"
                         :to="{name: 'landing.user.preferences'}"
                         v-if="currentUser.saved_drinks && currentUser.saved_drinks.checkFromAttr('id', drink.id)">
                {{translations.buttons.saved_drink}} <i class="fa fa-check"></i>
            </router-link>
        </div>

        <div v-if="!isLogged">
            <router-link tag="button" class="btn btn-fixed-bottom btn-success" style="position: fixed"
                         :to="{name: 'landing.auth.login', query:{redirect: $route.path}}"
                         >
                {{translations.buttons.unauthenticated}}
            </router-link>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import drinkObj from '../../../models/Drink.js'
    import mainHeader from '@/components/main-header.vue'
    import * as translations from '@/translations/drinks/show'

    export default {
        name: 'show-drink',
        components: {
            pagination: require('@/components/pagination.vue'),
            mainHeader
        },
        data () {
            return {
                interactions: {
                    phraseSelected: '',
                },
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
                ],
                newComment: {
                    drink_id: '',
                    user_id: '',
                    comment: ''
                },
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userDrinkLikes', 'language']),
            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },

            drinkBackground: function () {
                return 'url(' + this.drink.photo_url + ')';
            },

            nutritional_facts_ordereds: function () {
                let that = this
                return _.orderBy(this.nutritional_facts, 'id', 'asc');
            },

        },
        watch: {
            language(val, oldVal) {
                this.drawChart()
            }
        },
        mounted(){
            this.getDrink();
            this.getDrinkComments();
        },
        methods: {

            ...mapActions(['setLoading', 'addDrinkToSavedDrinks', 'removeDrinkFromSavedDrinks', 'addUserDrinkLike', 'removeUserDrinkLike']),

            back: () => window.history.back(),

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

                const keys = this.translations.map_labels;

                const values = [this.drink.sour, this.drink.sweet, this.drink.bitter, this.drink.dry, this.drink.salt, alcohol.value];

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
                    newComment: {
                        event_id: '',
                        user_id: '',
                        comment: ''
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

            saveComment: function () {
                let that = this

                var data = {
                    drink_id: that.drink.id,
                    guest_id: that.currentUser.id,
                    comment: that.newComment.comment,
                }

                that.$http.post('/guest/drinkComment', data)
                    .then(function (response) {

                        that.interactions.phraseSelected = ''
                        that.comments.unshift(response.data.comment)
                        that.pagination.total = that.pagination.total + 1

                        that.resetComment()
                        successNotify('', 'Comentário salvo com sucesso.');
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
                        that.checkDrinkNutrition();
                        that.setLoading({is_loading: false, message: ''})
                        that.drawChart();
                    })
                    .catch(function (error) {
                        console.log(error)
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
            },

            resetComment(){
                let that = this
                that.newComment.comment = '';
                $('#modal-comment').modal('hide');
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
