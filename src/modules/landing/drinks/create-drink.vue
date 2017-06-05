<template lang="html">
    <div class="page">
        <div class="container">
            <div class="text-center">
                <h2>Crie seu drink personalizado!</h2>
            </div>

            <div class="float-label" ref="drinkName">
                <label>
                    <input type="text" v-model="drink.name" required>
                    <span>Qual vai ser o nome para o seu drink?</span>
                </label>
            </div>

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


            <div class="md-created-drink-chart">
                <div class="row">

                    <div class="col-sm-12" v-if="!isNewDrink">
                        <div class="badges">
                            <div class="badge-container">
                                <span class="badge">
                                    <img :src="guestBadge" alt="Drink Criado Por Um Convidado" title="Drink Criado Por Um Convidado">
                                    <span>Drinks criados por convidados recebem essa medalha</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <canvas ref="createdDrinkChart"></canvas>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary btn-block m-t-10" name="button" @click="setDrink()">
                <span v-if="isNewDrink">Criar drink!</span>
                <span v-if="!isNewDrink">Atualizar drink!</span>
            </button>

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
                    flavor: {
                        Citrico: 0,
                        Frutado: 0,
                        Amargo: 0,
                        Seco: 0,
                        Alcool: 0
                    },
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

                this.drink.flavor.Citrico = 0
                this.drink.flavor.Frutado = 0
                this.drink.flavor.Amargo = 0
                this.drink.flavor.Seco = 0
                this.drink.flavor.Alcool = 0

                if (!this.drink.name) {
                    $(this.$refs.drinkName).addClass('error')
                    errorNotify('', 'O nome do drink é obrigatório')
                }
                if (!this.selectedIngredients.length) {
                    errorNotify('', 'Que tal adicionar alguns ingredientes ao seu drink?')
                }
                else {

                    if(!this.isNewDrink) successNotify('', `"${this.drink.name}" atualizado com sucesso!`)
                    else successNotify('', `"${this.drink.name}" criado com sucesso!`)

                    // set each attr to created drink.
                    this.selectedIngredients.map((ingredient) => {
                        this.drink.flavor.Citrico += ingredient.suor
                        this.drink.flavor.Frutado += ingredient.sweet
                        this.drink.flavor.Amargo += ingredient.bitter
                        this.drink.flavor.Seco += ingredient.dry
                        this.drink.flavor.Alcool += ingredient.alcohol

                    })

                    this.isNewDrink = false
                    $(this.$refs.drinkName).removeClass('error')
                    this.drawChart(this.$refs.createdDrinkChart)
                }

            },

            drawChart: function(el){

                const keys = Object.keys(this.drink.flavor)
                const values = Object.values(this.drink.flavor)

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

.page{ margin-top: 80px; min-height: 100vh; padding-bottom: 30px}

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

.badge span{
    display: block;
    width: 100%;
    color: rgba(44, 62, 80, 1);
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    text-transform: uppercase;
}

/* inputs floating label */

.float-label{
    width: 100%;
    position: relative;
    padding-top: 30px;
    margin: 40px 0;
}

.float-label label {
    width: 100%;
    display: block;
}

.float-label label span{
    position: absolute;
    top: 35px;
    left:0;
    transition: ease .1s;
    font-size: 16px;
}

.float-label input{
    width: 100%;
    border: none;
    border-bottom: #2c3e50 2px solid;
    background: #fff;
    padding: 5px 0px 5px 0px;
    font-size: 16px;
}
.float-label input:focus{ outline: none; }

.float-label label input:valid + span,
.float-label label input:focus + span{
    top: 0;
    transition: ease .1s;
    font-size: 12px;
    color: #2c3e50 !important;
}

.float-label.error label span { color: #d9534f; }
.float-label.error label input { border-color: #d9534f; }
.float-label label input:valid,
.float-label.error label input:focus{ border-color: #2c3e50; }

/* Form Control */
.form-control {
    border-color: red;
}
</style>
