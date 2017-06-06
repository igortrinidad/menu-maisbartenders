<template lang="html">
    <div>
        <div class="container">
            <div class="text-center">
                <h2>Crie seu drink personalizado!</h2>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Nome do seu drink</label>
                        <input class="form-control" type="text" v-model="drink.name">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Ingredientes</label>
                <v-select
                    :label="'name'"
                    :options="ingredients"
                    :multiple="true"
                    v-model="selectedIngredients"
                    @on-change="createDrink('haha')"
                    placeholder="Selecione ingredientes para montar seu drink"
                >
                    <span slot="no-options">Não foi possível localizar ingredientes :(</span>
                </v-select>
            </div>
            
            <label>Apresentação</label>
            <div class="form-group">
                
                <div class="col-md-3 col-xs-6">
                    <img src="../../../assets/mockup/martini.png" width="100%">
                </div>
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

                    <div class="col-sm-6 col-sm-offset-3">
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
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Chart from 'chart.js'
    import vSelect from "vue-select"

    export default {

        name: 'create-drink',
        components: {vSelect},
        data () {
            return {
                isNewDrink: true,
                ingredientsFetcheds: [],
                selectedIngredients: [],
                guestBadge: '../../../../static/assets/drink-created.png',
                drink: {
                    name: '',
                    sour: 0,
                    sweet: 0,
                    bitter: 0,
                    dry: 0,
                    alcohol: 0,
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

            setDrink: function() {
                // reset values in update case

                if (!this.drink.name || !this.selectedIngredients.length) {
                    $(this.$refs.drinkName).addClass('error')
                    errorNotify('', !this.drink.name ? 'Nome do drink é obrigatório' : 'Que tal adicionar alguns ingredientes ao seu drink?')
                }
                else {

                    if(!this.isNewDrink) {
                        successNotify('', `"${this.drink.name}" atualizado com sucesso!`)
                    }
                    else {
                        successNotify('', `"${this.drink.name}" criado com sucesso!`)
                    }



                    this.isNewDrink = false
                    $(this.$refs.drinkName).removeClass('error')
                    this.drawChart(this.$refs.createdDrinkChart)
                }

            },
            //
            // setFlavors: function() {
            //
            // },

            drawChart: function(el){

                this.drink.sour = 0
                this.drink.sweet = 0
                this.drink.bitter = 0
                this.drink.dry = 0

                const keys = ['Cítrico/Refrescante', 'Frutado/Doce','Amargo','Seco'];

                const values = [
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

.badge{ margin: 0 auto; width: 70px; height: 70px; }

</style>
