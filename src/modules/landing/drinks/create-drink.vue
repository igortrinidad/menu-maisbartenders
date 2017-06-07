<template lang="html">
    <div class="page">
        <div class="container">
            <div class="text-center">
                <h2>Crie seu drink personalizado!</h2>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Nome do drink</label>
                        <input class="form-control" type="text" v-model="drink.name">
                    </div>
                </div>
            </div>

            <div class="form-group" style="position: relative;">
                <label>Ingredientes</label>
                <v-select
                    :label="'name'"
                    :options="ingredients"
                    :multiple="true"
                    v-model="selectedIngredients"
                    placeholder="Selecione ingredientes para montar seu drink"
                >
                    <span slot="no-options">Não foi possível localizar ingredientes :(</span>
                </v-select>
            </div>

            <label>Apresentação</label>
            <div class="form-group">
                <div class="row">
                    <div class="col-lg-2 col-sm-4 col-xs-6" v-for="(presentation, index) in presentations" :key="index">
                        <div ref="presentation" class="presentation" @click="setPresentation(presentation.name, $event)">
                            <img :src="presentation.path">
                            <div class="text-center text-overflow">
                                <span>{{ presentation.name }}
                                    <i class="fa fa-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Estilo</label>
                <v-select
                    :label="'name'"
                    :options="styles"
                    :multiple="false"
                    v-model="drink.style"
                    placeholder="Escolha o nível de alcool"
                >
                    <span slot="no-options">Não foi possível localizar estilos :(</span>
                </v-select>
            </div>

            <div class="md-created-drink-chart">
                <div class="row">

                    <div class="col-sm-12" v-if="!isNewDrink">
                        <div class="badges">
                            <div class="badge-container">
                                <span class="badge">
                                    <img :src="guestBadge" alt="Drink Criado Por Um Convidado" title="Drink Criado Por Um Convidado">
                                </span>
                                <span class="text">
                                    Drinks criados por convidados recebem essa medalha
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-sm-offset-3" :class="{ 'canvas-empty': isNewDrink }">
                        <canvas ref="createdDrinkChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="row">
                    <div class="col-sm-12 button-container">
                        <button type="button" class="btn btn-primary btn-block m-t-10" name="button" @click="setDrink()">
                            <span v-if="isNewDrink">Criar drink!</span>
                            <span v-if="!isNewDrink">Atualizar drink!</span>
                        </button>
                    </div>
                </div>

                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <router-link class="btn inline btn-xl m-t-30" :to="{ name: 'landing.drinks.list' }">
                                Ir para cardápio completo
                            </router-link>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Chart from 'chart.js'
    import vSelect from "vue-select"

    import martini from '../../../assets/mockup/martini.png'
    import high_ball from '../../../assets/mockup/high_ball.png'
    import margarita from '../../../assets/mockup/margarita.png'
    import ilha_bela_alto from '../../../assets/mockup/ilha_bela_alto.png'
    import ilha_bela_baixo from '../../../assets/mockup/ilha_bela_baixo.png'
    import barone from '../../../assets/mockup/barone.png'

    export default {

        name: 'create-drink',
        components: {vSelect},
        data () {
            return {
                isNewDrink: true,
                ingredientsFetcheds: [],
                selectedIngredients: [],
                presentations: [
                    { name: 'High ball', path: high_ball },
                    { name: 'Ilha bela alto', path: ilha_bela_alto },
                    { name: 'Ilha bela baixo', path: ilha_bela_baixo },
                    { name: 'Margarita', path: margarita },
                    { name: 'Martini', path: martini },
                    { name: 'Barone', path: barone }
                ],
                styles: [
                    { name: 'Leve', value: 2.5 },
                    { name: 'Normal', value: 5.0 },
                    { name: 'Forte', value: 7.5 },
                    { name: 'Super Forte', value: 10.0 },
                ],
                guestBadge: '../../../../static/assets/drink-created.png',
                drink: {
                    name: '',
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
            ...mapGetters(['currentUser', 'isLogged']),

            ingredients: function() {
                let arr = []

                this.ingredientsFetcheds.map((drink) => {
                    drink.items.map((item) => {
                        if(arr.checkFromAttr('name', item.name)){
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
                    this.isNewDrink = false
                    this.drink.items = this.selectedIngredients
                    console.log(this.drink)
                    successNotify('', this.isNewDrink ? `${this.drink.name} criado com sucesso!` : `${this.drink.name} atualizado com sucesso`)
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
                        that.ingredientsFetcheds = response.data
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
    margin: 15px 0;
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

.presentation i{ display: none; }
.presentation.active i{ display: inline; }


</style>
