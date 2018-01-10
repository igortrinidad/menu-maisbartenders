<template lang="html">
    <div class="first-container">

        <main-header :title="translations.title" />

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

                    <!-- Path Martini -->
                    <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 90.266653,1.6 c -0.3,-0.7 -1,-1.1 -1.8,-1.1 H 2.4666534 c -0.8,0 -1.49999999,0.4 -1.79999999,1.1 -0.3,0.7 -0.2,1.5 0.3,2.1 L 43.666653,53.8 c 0,0.1 0,0.3 0,0.4 v 30.4 h -11.4 c -1.1,0 -2,0.9 -2,1.9 0,1 0.9,1.9 2,1.9 h 26.5 c 1.1,0 2,-0.9 2,-1.9 0,-1 -0.9,-1.9 -2,-1.9 h -11.3 V 54.2 c 0,-0.2 0,-0.3 -0.1,-0.5 l 42.6,-50 c 0.5,-0.6 0.6,-1.4 0.3,-2.1 z M 45.466653,50 6.6666534,4.4 H 84.366653 Z"
                    />

                    <!-- Path Plus -->
                    <g transform="translate(-133.38995,-23.280592)">
                        <g transform="matrix(0.69320669,0,0,0.69320669,173.37256,53.534478)">
                            <path class="non-fill animated" stroke="url(#linear)"
                                d="m 73,50 c 0,1.105 -0.895,2 -2,2 H 52 v 19 c 0,1.104 -0.895,2 -2,2 -1.105,0 -2,-0.896 -2,-2 V 52 H 29 c -1.105,0 -2,-0.895 -2,-2 0,-1.105 0.895,-2 2,-2 H 48 V 29 c 0,-1.105 0.895,-2 2,-2 1.105,0 2,0.895 2,2 v 19 h 19 c 1.105,0 2,0.895 2,2 z"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            <h4 class="title-section">{{translations.message}}</h4>
        </div>

        <div class="container-colored">
            <div class="container">

                <!-- Drink Base Infos -->
                <div class="card">
                    <div class="card-body card-padding">
                        <div class="form-group">
                            <label for="drink-name">{{translations.labels.name}}</label>
                            <input
                                id="drink-name"
                                class="form-control"
                                :placeholder="translations.placeholders.name"
                                type="text"
                                v-model="drink.name"
                            >
                        </div>

                        <div class="form-group">
                            <label for="drink-description">{{translations.labels.description}}</label>
                            <input
                                id="drink-description"
                                class="form-control"
                                :placeholder="translations.placeholders.description"
                                type="text"
                                v-model="drink.description"
                            >
                        </div>

                        <div class="form-group" style="position: relative;">
                            <label for="drink-ingredients">{{translations.labels.ingredients}}</label>
                            <v-select
                                id="drink-ingredients"
                                :label="'name_pt'"
                                :options="ingredients"
                                :multiple="true"
                                v-model="selectedIngredients"
                                :placeholder="translations.placeholders.ingredients"
                            >
                                <span slot="no-options">{{translations.no_ingredients}}</span>
                            </v-select>
                        </div>
                    </div>
                </div>

                <!-- Drink Presentation & Style -->
                <div class="card text-center">
                    <div class="card-body card-padding">

                        <!-- Presentation -->
                        <div class="form-group">
                            <label>{{translations.labels.presentation}}</label>
                            <div class="row-x">
                                <div ref="presentation" class="presentation" v-for="(presentation, index) in presentations" :key="index">
                                    <img class="cursor-pointer" :src="presentation.path" @click="setPresentation(presentation[`name_${language}`], $event)">
                                    <div class="text-center text-overflow">
                                        <span>{{ presentation[`name_${language}`] }}
                                            <i class="fa fa-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Style -->
                        <div class="form-group">
                            <label for="drink-style">{{translations.labels.style}}</label>

                            <div class="m-t-10">
                                <button
                                    type="button"
                                    class="btn btn-xs btn-mb-primary m-5"
                                    v-for="style in styles"
                                    :class="{ 'outline': style[`name_${language}`] !== drink.style }"
                                    @click="drink.style = style[`name_${language}`]"
                                >
                                    {{ style[`name_${language}`] }}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                <!-- Flavor's Map -->
                <div class="card" v-if="!isNewDrink">
                    <div class="card-body card-padding">

                        <div class="badge-container">
                                <span class="badge">
                                    <img :src="guestBadge" alt="Drink Criado Por Um Convidado" title="Drink Criado Por Um Convidado">
                                </span>
                            <div class="text-center">
                                    <span class="text">
                                        {{translations.badge}}
                                    </span>
                            </div>
                        </div>

                        <div :class="{ 'canvas-empty': isNewDrink }">
                            <canvas ref="createdDrinkChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Create/Update -->
                <button type="button" class="btn btn-mb-primary-reverse btn-block m-b-30" name="button" @click="setDrink()">
                    <span v-if="isNewDrink">{{translations.buttons.create}}</span>
                    <span v-if="!isNewDrink">{{translations.buttons.update}}</span>
                </button>

            </div>
        </div>

        <router-link class="btn btn-mb-info btn-fixed-bottom" style="position: fixed" :to="{ name: 'landing.drinks.list' }">
            {{translations.buttons.go_to_menu}}
        </router-link>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Chart from 'chart.js'
    import vSelect from "vue-select"
    import slug from 'slug'
    import moment from 'moment'

    import martini from '../../../assets/mockup/martini.png'
    import high_ball from '../../../assets/mockup/high_ball.png'
    import margarita from '../../../assets/mockup/margarita.png'
    import ilha_bela_alto from '../../../assets/mockup/ilha_bela_alto.png'
    import ilha_bela_baixo from '../../../assets/mockup/ilha_bela_baixo.png'
    import barone from '../../../assets/mockup/barone.png'

    import mainHeader from '@/components/main-header.vue'
    import * as translations from '@/translations/drinks/create-drink'

    export default {

        name: 'create-drink',
        components: {
            vSelect,
            mainHeader
        },
        data () {
            return {
                isNewDrink: true,
                ingredientsFetcheds: [],
                selectedIngredients: [],
                presentations: [
                    { name_pt: 'High ball', name_en: 'High ball', path: high_ball },
                    { name_pt: 'Ilha bela alto', name_en: 'Ilha bela high', path: ilha_bela_alto },
                    { name_pt: 'Ilha bela baixo', name_en: 'Ilha bela low', path: ilha_bela_baixo },
                    { name_pt: 'Margarita', name_en: 'Margarita', path: margarita },
                    { name_pt: 'Martini', name_en: 'Martini', path: martini },
                    { name_pt: 'Barone', name_en: 'Barone', path: barone }
                ],
                styles: [
                    {name_pt: 'Sem álcool', name_en: 'Alcohol-free', value: 0},
                    { name_pt: 'Leve', name_en: 'Light', value: 2.5 },
                    { name_pt: 'Normal', name_en: 'Normal', value: 5.0 },
                    { name_pt: 'Forte', name_en: 'Strong', value: 7.5 },
                    { name_pt: 'Super Forte', name_en: 'Super strong', value: 10.0 },
                ],
                guestBadge: '../../../../static/assets/drink-created.png',
                drink: {
                    name: '',
                    description: '',
                    url: '',
                    created_at: '',
                    updated_at: '',
                    presentation: '',
                    style: '',
                    sour: 0,
                    sweet: 0,
                    bitter: 0,
                    dry: 0,
                    alcohol: 0,
                    created_by_guest: true,
                    items: [
                    ]
                }
            }
        },

        computed:{
            ...mapGetters(['currentUser', 'isLogged', 'language']),

            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },

            ingredients: function() {
                let arr = []

                this.ingredientsFetcheds.map((drink) => {
                    drink.items.map((item) => {
                        if(arr.checkFromAttr('name_pt', item.name_pt)){
                            return false
                        } else {
                            arr.push(item)
                        }
                    })
                })

                return _.orderBy(arr, 'category', 'asc');
            }
        },

        mounted(){
            this.getIngredientsByDrinks()
        },

        methods: {

            setPresentation: function(presentation, event) {
                $(this.$refs.presentation).removeClass('active')
                $(event.target.parentNode).addClass('active')
                this.drink.presentation = presentation
            },

            validateDrink: function() {
                if (!this.drink.name) return { validated: false, message: 'Dê um nome para seu drink' }
                if (!this.selectedIngredients.length) return { validated: false, message: 'Que tal escolher alguns ingredientes ao seu drink?' }
                if (this.selectedIngredients.length === 1) return { validated: false, message: 'Que tal adicionar mais algum ingrediente ao seu drink?' }
                if (!this.drink.presentation) return { validated: false, message: 'Escolha uma apresentação para seu drink' }
                if (!this.drink.style) return { validated: false, message: 'Escolha um estilo para seu drink' }
                else return { validated: true }
            },

            setDrink: function() {

                const validate = this.validateDrink()

                if (!validate.validated) {
                    errorNotify('', validate.message)
                }
                else {

                    successNotify('', this.isNewDrink ? `${this.drink.name} criado com sucesso!` : `${this.drink.name} atualizado com sucesso`)

                    // set created and updated date
                    if (this.isNewDrink) {
                        this.drink.created_at = moment().format('YYYY-MM-DD h:m:s')
                        this.drink.updated_at = moment().format('YYYY-MM-DD h:m:s')
                    }
                    else {
                        this.drink.updated_at = moment().format('YYYY-MM-DD h:m:s')
                    }

                    this.isNewDrink = false
                    this.drink.items = this.selectedIngredients
                    this.drink.url = slug(this.drink.name).toLowerCase()
                    console.log(this.drink)
                    this.drawChart(this.$refs.createdDrinkChart)
                }

            },

            drawChart: function(el){

                this.drink.sour = 0
                this.drink.sweet = 0
                this.drink.bitter = 0
                this.drink.dry = 0

                const keys = ['Alcool', 'Cítrico','Amargo', 'Doce', 'Seco'];
                const values = [
                    this.drink.style.value,
                    this.selectedIngredients.reduce( (ac, ingredient) => ac + ingredient.sour,0),
                    this.selectedIngredients.reduce( (ac, ingredient) => ac + ingredient.sweet,0),
                    this.selectedIngredients.reduce( (ac, ingredient) => ac + ingredient.bitter,0),
                    this.selectedIngredients.reduce( (ac, ingredient) => ac + ingredient.dry,0)
                ];

                if (this.chart) this.chart.destroy()
                this.chart = new Chart(el, {
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
                        pointDot:false,
                        showTooltips: false,
                        scaleOverride: true,
                        scaleSteps: 2,
                        scaleStepWidth: 2,
                        scaleBeginAtZero: true,
                        scale: {
                            ticks: {
                                min: 0,
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

            getIngredientsByDrinks: function() {
                let that = this
                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {
                        that.ingredientsFetcheds = response.data.drinks
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

        }
    }
</script>

<style scoped>
    .canvas-empty{ height: 0; }

    .button-container{ margin-top: 30px; }

    .md-created-drink-chart{
        margin-top: 30px;
    }

    /* badge */
    .md-created-drink-chart .badges{
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .badge-container{
        width: 100%;
        position: relative;
        padding: 0 20px 20px 20px;
        margin: 30px 0;
    }
    .badge:hover{ transform: none }

    .badge{
        margin: 0 auto 20px auto;
        width: 70px;
        height: 70px;
    }

    /* presentations */
    .presentation{
        position: relative;
        margin: 15px;
        display: inline-block;
        width: 100%;
    }

    .presentation img{
        max-width: 100%;
        filter: grayscale(1);
        transition: ease .3s;
        border-radius: 4px;
        box-sizing: border-box !important;
        border: 2px solid transparent;
    }

    .presentation.active img{
        filter: grayscale(0);
        transition: ease .3s;
        border: 2px solid #2c3e50;
    }

    .presentation .text-center{
        font-weight: bold;
        text-transform: uppercase;
        color: #2c3e50;
        margin-top: 10px;
        font-size: 12px;
    }

    .presentation i{
        display: none;
        width: 100%;
        position: absolute;
        text-align: right;
        top: 0;
        padding-top: 7px;
        padding-right: 7px;
        font-size: 16px;
    }
    .presentation.active i{ display: block; }

    @media (max-width: 768px) {
        .presentation{
            width: 50%;
        }
    }

</style>
